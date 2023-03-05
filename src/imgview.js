import $ from 'jquery';

export default {
    mounted(){
        console.info("[mangodoc-imgview] mounted")
        setTimeout(() => {
          const images = document.querySelectorAll("#app img");
          const overlay = document.querySelector(".overlay");
          const overlayImage = overlay.querySelector("img");
          var mc = new Hammer(overlayImage);
          var currentScale = 1;
          var lastScale = 1;
          images.forEach((image) => {
            image.addEventListener("click", () => {
              overlayImage.src = image.src;
              overlay.style.display = "flex";
              overlayImage.style.display = "block";
              $(overlay).show();
              // 监听 Hammer.js 事件
              mc.add(new Hammer.Pinch());
              mc.on("pinchstart", function() {
                lastScale = currentScale;
              });
              mc.on("pinchmove", function(ev) {
                currentScale = lastScale * ev.scale;
                overlayImage.style.transform = "scale(" + currentScale + ")";
              });
            });
          });

          overlay.addEventListener("click", () => {
            $(overlay).hide();
            $(overlayImage).hide();
          });
        }, 1000); 
    }
}