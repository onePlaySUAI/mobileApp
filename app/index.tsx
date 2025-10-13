import { Redirect } from "expo-router";
export default function Index() {
  return (
    // Логика проверки через StateManager, есть ли юзер
    <Redirect href='/register' />
    // Иначе
    // <Redirect href='/home' />

  );
}
