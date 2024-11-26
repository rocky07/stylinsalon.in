(function ($) {
    $.extend($.fn, {
        simpleLightboxVideo: function () {
            const settings = {
                delayAnimation: 300,
                keyCodeClose: 27,
            };

            // Attach click event to elements
            this.click(function () {
                const videoSite = $(this).data("videosite");
                const videoId = $(this).data("videoid");

                if (!videoSite || !videoId) {
                    console.error("Missing video site or video ID.");
                    return false;
                }

                // Calculate margin for vertical centering
                const marginTop = Math.max((window.innerHeight - 540) / 2, 0);
                const lightboxHTML = `
                    <div id="slvj-window" style="display: none;">
                        <div id="slvj-background-close"></div>
                        <div id="slvj-back-lightbox">
                            <div class="slvj-lightbox" style="margin-top: ${marginTop}px">
                                <div id="slvj-close-icon"></div>
                                <iframe 
                                    id="slvj-video-embed" 
                                    src="" 
                                    width="640" 
                                    height="480" 
                                    style="border:0;" 
                                    allow="autoplay;encrypted-media; picture-in-picture">
                                </iframe>
                            </div>
                        </div>
                    </div>
                `;

                // Append lightbox to body
                $("body").append(lightboxHTML);

                // Determine video URL
                const videoSrc =
                    videoSite === "youtube"
                        ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1`
                        : videoSite === "vimeo"
                        ? `https://player.vimeo.com/video/${videoId}?autoplay=1`
                        : null;

                if (!videoSrc) {
                    console.error("Unsupported video site.");
                    return false;
                }

                // Set video source and show lightbox
                $("#slvj-video-embed").attr("src", videoSrc);
                $("#slvj-window").fadeIn();

                // Event listeners for close
                const closeLightbox = function () {
                    $("#slvj-window").fadeOut(settings.delayAnimation, function () {
                        $(this).remove();
                    });
                };

                $("#slvj-close-icon").click(closeLightbox);
                
                $("#slvj-background-close").click(function(e) {
                    if (!a(e.target).closest("#slvj-video-embed").length) { 
                        $("#slvj-window").fadeOut(a.simpleLightboxVideo.vars.delayAnimation, function() {
                            $(this).remove()
                        });
                    }
                });
                

                $(document).on("keyup.slvj", function (e) {
                    if (e.keyCode === settings.keyCodeClose) {
                        closeLightbox();
                        $(document).off("keyup.slvj");
                    }
                });

                return false;
            });

            // Handle window resize for re-centering
            $(window).resize(function () {
                const marginTop = Math.max((window.innerHeight - 540) / 2, 0);
                $(".slvj-lightbox").css({ marginTop: `${marginTop}px` });
            });

            return this;
        },
    });

    $.simpleLightboxVideo = function (selector) {
        $(selector).simpleLightboxVideo();
    };
})(jQuery);
