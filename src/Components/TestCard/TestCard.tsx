import "./TestCard.css";
import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { ITest } from "../../Store/Store.ts";
import { StoreContext } from "../../Context/StoreContext.ts";
import { useNavigate } from "react-router-dom";
import { applySnapshot } from "mobx-state-tree";
import { getNewTestSnapShot } from "../../Helpers/Utils.ts";

export const TestCard = observer(({ test }: { test: ITest }) => {
  const [value, setValue] = useState<string>("");
  const { Store } = useContext(StoreContext);
  const navigation = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    applySnapshot(Store.CurrentTest, [getNewTestSnapShot(test, value)]);
    navigation("/passingtest");
  };

  return (
    <div className="test-card-container">
      <h3>{test.Name}</h3>
      <form action="" onSubmit={handleSubmit}>
        <input
          required
          value={value}
          onChange={handleChange}
          type="text"
          name={"user-name-input"}
          placeholder="Введите имя"
        />
        <button className="btn-success" type="submit">
          Начать тест
        </button>
      </form>
    </div>
  );
});
