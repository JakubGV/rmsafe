# Imports
from random import randrange
from hidden_prints import HiddenPrints
import numpy as np
import mxnet as mx
from mxnet import gluon, nd, image
from mxnet.gluon.data.vision import transforms
from gluoncv.data.transforms import video
from gluoncv import utils
from gluoncv.model_zoo import get_model
from gluoncv.utils.filesystem import try_import_decord

class CameraModel:
    __classes = {
        0: 'other',
        1: 'falling'
    }

    def __init__(self, param_file: str, use_gpu: bool): # Load model with the parameters from parameter_file
        self._decord = try_import_decord()
        self._ctx = mx.gpu(0) if use_gpu else mx.cpu()
        with HiddenPrints():
            self.net = get_model(name='i3d_resnet50_v1_custom', nclass=2)
            self.net.collect_params().reset_ctx(self._ctx)
            self.net.load_parameters(param_file, ctx=self._ctx)

    def get_class(self, label_num: int) -> str: # return the string label of a number class
        if label_num in self.__classes:
            return self.__classes[label_num]
        else:
            raise ValueError(f"Label number {label_num} is not valid")

    def _preprocess(self, video_file): # preprocess the video for running
        # pretend here that `video_file` is a path to a video
        vr = self._decord.VideoReader(video_file)
        num_frames = len(vr)
        print(num_frames)
        middle_frame = num_frames // 2 # Choose the middle frames
        if middle_frame - 32 < 0 or middle_frame + 32 > num_frames:
            frame_id_list = range(middle_frame - 16, middle_frame + 16, 1) # grab 32 frames, choosing every frame
        else:
            frame_id_list = range(middle_frame - 32, middle_frame + 32, 2) # grab 32 frames, choosing every other frame
        video_data = vr.get_batch(frame_id_list).asnumpy()
        clip_input = [video_data[vid, :, :, :] for vid, _ in enumerate(frame_id_list)]
        transform_fn = video.VideoGroupValTransform(size=224, mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        clip_input = transform_fn(clip_input)
        clip_input = np.stack(clip_input, axis=0)
        clip_input = clip_input.reshape((-1,) + (32, 3, 224, 224))
        clip_input = np.transpose(clip_input, (0, 2, 1, 3, 4))

        return clip_input
    
    def evaluate(self, video_file): # Run the model on the video passed and return a label
        clip_input = self._preprocess(video_file)
        pred = self.net(nd.array(clip_input).as_in_context(self._ctx))
        label_num = nd.topk(pred)[0].astype('int')
        confidence = nd.softmax(pred)[0][label_num[0]].asscalar()

        return label_num[0].asscalar(), confidence