# Overflow, Scrollbar

## Thuộc tính overflow

-   visible (default)
-   hidden
-   scroll
-   auto

## overscroll-behavior (nhiều thanh cuộn lồng nhau)

-   auto (default) (mặc định khi cuộn hết thẻ con rồi cuộn tiếp sẽ cuộn tiếp tục thẻ cha)
-   contain (loại bỏ hành vi mặc định cuộn tiếp như trên default)
-   none (giống như contain nhưng khi áp dụng ở trên điện thoại có thể loại bỏ hành vi cuộn cao su và cuộn lên trên để tải lại trang)

## Tùy biến scrollbar

```
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

## Overlay Scrollbar

```
html, body {
    overflow: overlay;
}
```
