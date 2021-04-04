### Description

**Request:** Simply send a post request to the **/upload** endpoint

**Response:** the response is JSON format contains 2 props:

    * filename: the name of the image uploaded
    * result: 0 non-glaucoma, 1 glaucoma

Basic usage example:

Don't forget the `enctype="multipart/form-data"` in your form.
Make sure that `name` property of the input is `image`.

```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="image" />
</form>
```
