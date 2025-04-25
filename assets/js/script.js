jQuery(function ($) {
    const $drawerIcon = $("#js-drawer-icon");
    const $drawerMenu = $("#js-drawer-menu");
    const $overlay = $("#js-overlay");
    const $pageTop = $("#js-pagetop");
    const $body = $("body");
    const $entryBanner = $('#js-entry-btn');
    const $faqItems = $(".faq__item");

    //  ドロワー開閉
    const toggleDrawer = (isOpen) => {
        if (isOpen) {
            const scrollY = window.scrollY;
            $body.css({
                position: 'fixed',
                top: `-${scrollY}px`,
                width: '100%',
            });
            $body.data("scrollY", scrollY);
        } else {
            const scrollY = $body.data("scrollY") || 0;
            $body.removeAttr("style");
            window.scrollTo(0, scrollY);
        }

        $drawerIcon.toggleClass("is-checked", isOpen);
        $drawerMenu.toggleClass("is-checked", isOpen);
        $overlay.toggleClass("show", isOpen);
    };

    $drawerIcon.on("click", function () {
        toggleDrawer(!$drawerMenu.hasClass("is-checked"));
    });

    $(window).on("resize", function () {
        if (window.innerWidth >= 1024) {
            toggleDrawer(false);
        }
    });

    $("#js-drawer-content a[href^='#'], #js-overlay").on("click", function () {
        toggleDrawer(false);
    });

    //  スムーススクロール
    $('a[href^="#"]').on("click", function (e) {
        e.preventDefault();
        const speed = 1000;
        const id = $(this).attr("href");
        const $target = $(id === "#" ? "html" : id);
        const position = $target.offset().top;
        $("html, body").animate({ scrollTop: position }, speed, "swing");
    });

    //  サブメニューの開閉
    $(".has-submenu > a").on("click", function (e) {
        e.preventDefault();
        $(this).next().slideToggle();
    });

    //  FAQアコーディオン
    $faqItems.each(function () {
        const $item = $(this);
        const $question = $item.find(".faq__question");
        const $answer = $item.find(".faq__answer");

        $question.on("click", function () {
            // 他の回答を閉じる
            $faqItems.not($item).each(function () {
                $(this).find(".faq__answer").removeClass("open");
                $(this).find(".faq__question").removeClass("active");
            });

            // クリックした質問を開閉
            $answer.toggleClass("open");
            $question.toggleClass("active");
        });
    });

    //  interviewスライダー
    $('.interview__boxes').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '.slick-prev',
        nextArrow: '.slick-next',
        appendDots: '.slick-pagination',
        autoplay: true,
        autoplaySpeed: 3000,

        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
        ]
    });

    //  ファーストビュー スライダー
    $('.fv__images').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        infinite: true,
        speed: 1000,
        spaceBetween: 15,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                },
            },
        ],
    });

    //  画面右下エントリーボタンの表示制御
    $entryBanner.hide();
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 100) {
            $entryBanner.fadeIn();
        } else {
            $entryBanner.fadeOut();
        }
    });
});