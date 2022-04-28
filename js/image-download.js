const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserHousing = document.querySelector('.ad-form__upload input[type=file]');
const previewHousing  = document.querySelector('.ad-form__photo img')

const downloadImage = (fileChooser, preview) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const matches = FILE_TYPES.some((it) => {
      return file.name.toLowerCase().endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
};

downloadImage(fileChooserAvatar, previewAvatar);
downloadImage(fileChooserHousing, previewHousing);
