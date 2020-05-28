import React, { useCallback, useState, useEffect } from "react";
import InputMask from "./InputMask";
import { MaskedEvent } from "./InputMask";

const api = () => {
  return new Promise<string>((resolve) => setTimeout(resolve, 1, "1000"));
};

const App = () => {
  const [form, setForm] = useState({
    price: "",
    delayedPrice: "",
    filledPrice: "1000",
  });

  const handleChange = useCallback(
    (e: MaskedEvent) => {
      if (e.name) {
        setForm((prev) => ({ ...prev, [e.name!]: e.value }));
      }
    },
    [setForm]
  );

  const loadPrice = useCallback(async () => {
    const value = await api();

    setForm((prev) => ({ ...prev, delayedPrice: value }));
  }, []);

  useEffect(() => {
    loadPrice();
  }, [loadPrice]);

  const { price, delayedPrice, filledPrice } = form;

  return (
    <div className="App">
      <div>
        <label htmlFor="currency">Price</label>
        <InputMask
          options={{
            mask: "R$ num",
            blocks: { num: { mask: Number, thousandsSeparator: "." } },
          }}
          className="form__input"
          name="price"
          placeholder="Price"
          id="price"
          onAccept={handleChange}
          defaultValue={price}
        />
      </div>

      <div>
        <label htmlFor="currency">Delayed Price</label>
        <InputMask
          options={{
            mask: "R$ num",
            blocks: { num: { mask: Number, thousandsSeparator: "." } },
          }}
          className="form__input"
          name="price"
          placeholder="Price"
          id="price"
          onAccept={handleChange}
          defaultValue={delayedPrice}
        />
      </div>

      <div>
        <label htmlFor="currency">Filled Price</label>
        <InputMask
          options={{
            mask: "R$ num",
            blocks: { num: { mask: Number, thousandsSeparator: "." } },
          }}
          className="form__input"
          name="price"
          placeholder="Price"
          id="price"
          onAccept={handleChange}
          defaultValue={filledPrice}
        />
      </div>
    </div>
  );
};

export default App;
