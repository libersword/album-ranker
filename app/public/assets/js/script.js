$('[data-rating] .star').on('click', function() {
    var selectedCssClass = 'selected';
    var $this = $(this);
    $this.siblings('.' + selectedCssClass).removeClass(selectedCssClass);
    $this
    .addClass(selectedCssClass)
    .parent().addClass('is-voted');
});

var $navList = $('.menu-fancy');

$navList.on('click', 'li:not(.is-selected)', function(e){
$navList.find(".is-selected").removeClass("is-selected");
$(e.currentTarget).addClass("is-selected");
});

