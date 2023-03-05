const pickBtn = document.getElementById("pick");
const colorList = document.getElementsByTagName("ul")[0];
const clear = document.querySelector(".clear");
let pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");
let copyColor = (ele) => {
  navigator.clipboard.writeText(ele.innerText);
  let tmp = ele.innerText;
  ele.innerText = "Copied";
  setTimeout(() => {
    ele.innerText = tmp;
  }, 1000);
};
let showColors = () => {
  const liTag = pickedColors
    .map(
      (color) => `
  <li>
    <span class="recent" style="background:${color}"></span>
    <p id="color-hex">${color}</p>
  </li>
  `
    )
    .join("");
  colorList.innerHTML = liTag;
  const li = document.querySelectorAll("li");
  li.forEach((ele) => {
    ele.addEventListener("click", (e) =>
      copyColor(e.currentTarget.lastElementChild)
    );
  });
};
showColors();
let openEyedropper = async () => {
  try {
    const eyeDropper = new EyeDropper();
    const { sRGBHex } = await eyeDropper.open();
    if (!pickedColors.includes(sRGBHex)) {
      pickedColors.push(sRGBHex);
      localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
      showColors();
    }
  } catch (error) {
    console.log(error);
  }
};
let clearAll = () => {
  localStorage.clear();
  pickedColors = [];
  colorList.innerHTML = "";
};
let copyHex = () => {};
clear.addEventListener("click", clearAll);
pickBtn.addEventListener("click", openEyedropper);
