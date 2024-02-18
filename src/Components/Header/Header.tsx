import "./Header.css";
import { useNavigate } from "react-router-dom";

//Компонент хедера страницы
export const Header = () => {
  const navigation = useNavigate();

  return (
    <header className="main-header">
      <button onClick={() => navigation("/")}>Тесты</button>
      <button onClick={() => navigation("/results")}>Результаты</button>
    </header>
  );
};
