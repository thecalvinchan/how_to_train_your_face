#How To Train Your Face

A Node script to capture 10 images per user to use as facial recognition
training data.

## Dependencies

- MongoDB (Because NoSQL is future)
- Some type of image capture program
    - OSX: I suggest imagesnap (`brew install imagesnap`, if you have brew)
    - Other UNIX: ¯\\\_(ツ)\_/¯ 

## Configure

Set Yo ENV variables correctly. Or don't.

    // The command to trigger image capture
    export OPENCV_IMAGE_CMD='imagesnap -q -w 2'
    // The directory to save your images
    export OPENCV_IMAGE_DIR='./images/'
    // These config settings are already defaulted. You only need to set your
    // ENV variables if you need/want to change them

## Run

`node prompt.js`
