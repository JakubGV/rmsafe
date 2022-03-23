# Steps
1. Install VisualStudio 2017 and install the desktop development features
2. Install cuda 10.0
3. Install anaconda if you don't have it already
4. Create a conda environment with Python version 3.7 (installed version will be 3.7.11)
5. Activate the conda environment
6. Update pip, etc. with `pip install --upgrade pip setuptools wheel`
7. `pip install --upgrade mxnet-cu100`
8. `pip install torch===1.4.0 torchvision===0.5.0 -f https://download.pytorch.org/whl/torch_stable.html`
9. `pip install --upgrade gluoncv`
10. `pip install ipykernel`
11. `pip install decord`
12. `pip install Cython`
13. `pip install mmcv`