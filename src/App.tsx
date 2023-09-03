import { createMemo, createSignal } from "solid-js";
import "./App.css";

// @ts-expect-error
import { makeQrCode } from "@grinstead/makeqrcode";

type QRCodeData = { sideLength: number; path: string };

function App() {
  // const [count, setCount] = createSignal(0);

  const [data, setData] = createSignal<QRCodeData>();

  // let qrcode;
  // if (data) {
  //   const {sideLength, path} = qrcode;

  // }

  let animFrame = 0;

  const input = (
    <input
      type="text"
      onInput={() => {
        animFrame ||= requestAnimationFrame(() => {
          animFrame = 0;
          setData(makeQrCode("L", input.value));
        });
      }}
    />
  ) as HTMLInputElement;

  const svg = (
    <svg width={320} height={320}>
      <style>{"path {stroke: black;}"}</style>
      <path d={data()?.path} />
    </svg>
  );

  return (
    <div class="paper">
      <h1 class="header">Joe Grinstead's Code Blog</h1>
      <div class="body">
        <p>Generate a QR Code</p>
        Put whatever value you want in there
        {input}
        {svg}
      </div>
      <div class="footer">Blog Post Footer</div>
    </div>
  );
}

export default App;
