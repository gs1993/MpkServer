/**
 * Created by rafal on 11.03.2016.
 */

$(document).ready(function () {
    $('.panels__close').on("click", function () {
        $('.wrapper').removeClass('-open');
        $('.header__corner').removeClass('-open');
        $('.headerLogo').removeClass('-hidden');
    });
});
