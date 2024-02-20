import $ from 'jquery';

export default {
    mounted(){
        console.info("[mangodoc-imgview] mounted")
        setTimeout(() => {
          $("#overlay-img").remove();
          let overlayEl = $('<div id="overlay-img" class="overlay" style="display: none;"></div>');
          let overlayImageEl = $('<img src="" alt="overlay image">');
          overlayImageEl.appendTo(overlayEl);
          overlayEl.appendTo($("body"));
          const images = document.querySelectorAll("#container img");
          const overlay = overlayEl.get(0);
          const overlayImage = overlayImageEl.get(0);
          var mc = new Hammer(overlayImage);
          let currentScale = 1;
          let lastScale = 1;
          let currentX = 0;
          let currentY = 0;
          let lastX = 0;
          let lastY = 0;
          images.forEach((image) => {
            image.addEventListener("click", () => {
              overlayImage.src = image.src;
              overlay.style.display = "flex";
              overlayImage.style.display = "block";
              $(overlay).show();
              // 监听 Hammer.js 事件
              mc.add(new Hammer.Pinch());
              mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL }));
              mc.on("pinchstart", () => {
                lastScale = currentScale;
              });
              mc.on("pinchmove", (ev) => {
                currentScale = lastScale * ev.scale;
                overlayImage.style.transform = "scale(" + currentScale + ") translate(" + currentX + "px, " + currentY + "px)";
              });
              mc.on("panstart", () => {
                lastX = currentX;
                lastY = currentY;
              });
              mc.on("panmove", (ev) => {
                currentX = lastX + ev.deltaX;
                currentY = lastY + ev.deltaY;
                overlayImage.style.transform = "scale(" + currentScale + ") translate(" + currentX + "px, " + currentY + "px)";
              });
            });
          });

          overlay.addEventListener("click", () => {
            $(overlay).hide();
            $(overlayImage).hide();
          });
        }, 2000); 
    }
}