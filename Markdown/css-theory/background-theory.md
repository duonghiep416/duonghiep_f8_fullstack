# Background

## Background Color

-   Giá trị mặc định là: transparent
-   Sử dụng mọi giá trị màu sắc: tên màu bằng tiếng Anh; mã màu hex, rgb, rgba, hsl, transparent, currentColor
-   Bao gồm: border, padding, content

## Background Image

-   Giá trị mặc định là none
-   Tính chất mặc định: Chỉ hiển thị đúng kích thước của ảnh, lặp lại theo 2 trục x,y
-   Ứng dụng của repeat: background image repeat stock
    -   background-repeat: no-repeat;
    -   background-repeat: repeat-x;
    -   background-repeat: repeat-y;
-   Có thể sử dụng nhiều background image:
    -   background-image:
        url("http://...),
        url("http://...); (Ảnh nào viết trước thì được hiện lên trên, đè lên ảnh ghi sau)
-   Ảnh nền từ sử dụng dữ liệu base64: https://codebeautify.org/image-to-base64-converter
-   Màu chuyển (linear-gradient):
    -   Syntax:
        -   background-image: linear-gradient(
            direction (optional - to bottom), color1(required) stop1, color2(required) stop2,...
            )

## Background Size

-   cover:
    -   Hiển thị ảnh nền lấp đầy kích thước của phần tử, một phần bức ảnh có thể mất đi nếu khung hình hiển thị có tỉ lệ khác với bức ảnh
    -   Không bao giờ để lại khoảng trắng trong kích thước phần tử, chấp nhận mất đi một phần bức ảnh để lấp đầy khoảng trắng
-   contain:
    -   Cố gắng không làm mất đi phần nào của bức ảnh, có thể phóng lớn hoặc thu nhỏ so với ảnh gốc
    -   Có thể để lại khoảng trắng ở bên trong nếu tỉ lệ của khung hình khác với tỉ lệ của bức ảnh
-   One value:
    -   background-size: 100%; (Hiểu là chiều ngang có giá trị 100%, chiều cao của ảnh nền sẽ là tự động (auto))
-   Two values:
    -   background-size: 100% 100%; (set cả chiều ngang và chiều cao, có thể gây méo ảnh nếu không tính đúng tỉ lệ ảnh)

## Background Position (Căn chỉnh vị trí của ảnh nền)

-   Keywords:
    -   top left (right)
    -   bottom left (right)
    -   center center
    -   top center (top)
    -   bottom center (bottom)
    -   left center (left)
    -   right center (right)
-   x% y% (có nhận giá trị âm)
-   xpos ypos (áp dụng để sử dụng sprites icon)

## Background Attachment (Quyết định khi trang web được cuộn đi thì ảnh nền sẽ cuộn theo hay vẫn hiển thị cố định)

-   Tham khảo: https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment
-   scroll (default): khi cuộn trang web thì phần có bgi được cuộn theo
-   fixed: chi tiết của bức ảnh có thể hiển thị cố định khi cuộn trang web (Khi fixed thì background-size: cover không có tác dụng)
-   local: sử dụng khi muốn background ở trong thanh cuộn được cuộn theo khi mình cuộn nội dung

## Background Clip (Quyết định màu nền hoặc ảnh nền trên 1 phần tử được đổ từ thành phần nào vào)

-   Background Clip có tác dụng cả với màu nền và ảnh nền
-   Tham khảo: https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip
-   border-box (default)
-   padding-box
-   content-box
-   text: áp dụng để làm chữ chuyển màu (khi áp dụng thuộc tính này thì phần nền chỉ được đổ vào phần text)
    -   sử dụng các thuộc tính: color: transparent; background-clip: text; (nên sử dụng tiền tố webkit trước background-clip để thích ứng trên nhiều trình duyệt)

## Background Origin (Quyết định gốc của ảnh nền được hiển thị từ thành phần nào của phần tử)

-   Background origin chỉ có tác dụng với ảnh nền (background-image), không có tác dụng với màu nền
-   padding-box (default)
-   border-box
-   content-box

## Background Shorthands

-   background: bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit;

## Backdrop-filter

-   https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
