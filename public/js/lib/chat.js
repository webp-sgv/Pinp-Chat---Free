$.fn.commentCardsMe = function () {
    return this.each(function () {
        var $this = $(this),
            $cards = $this.find(".card-group-me"),
            $current = $cards.filter(".card--current-me"),
            $next;

        $cards.on("click", function () {
            if (!$current.is(this)) {
                $cards.removeClass("card--current-me card--out-me card--next-me");
                $current.addClass("card--out-me");
                $current = $(this).addClass("card--current-me");
                $next = $current.next();
                $next = $next.length ? $next : $cards.first();
                $next.addClass("card--next-me");
            }
        });

        if (!$current.length) {
            $current = $cards.last();
            $cards.first().trigger("click");
        }

        $this.addClass("cards--active");
    });
};

$(".cards-group-me").commentCardsMe();