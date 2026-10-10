# Third-party files

`ort-1.19.2/` is ONNX Runtime Web 1.19.2 (MIT License, © Microsoft Corporation, https://github.com/microsoft/onnxruntime).
The three files are unmodified copies from the `onnxruntime-web@1.19.2` npm package (`dist/`):

| File | SHA-256 |
|---|---|
| `ort.wasm.min.js` | `98e831517582c08fc1b729def487a8b0152c83fc641746137eb4c7ad46032f1c` |
| `ort-wasm-simd-threaded.mjs` | `d870a377322c3053fb97432d548423f165dd15e2af232947592fc07b0d2f3639` |
| `ort-wasm-simd-threaded.wasm` | `1bf0b9ed7ad025cf9ca88ce6da29e54df3f128a169f8241d71823e81f078d578` |

The study apps use it to run the handwriting reader ("Read my answer") in the browser.
The reader's model is Pix2Text MFR 1.5 (MIT License, https://huggingface.co/breezedeus/pix2text-mfr-1.5). It isn't stored here;
the app downloads it from Hugging Face the first time the reader is used.
