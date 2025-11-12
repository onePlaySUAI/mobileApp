# Мобильное приложение OnePlay 

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).
Для работы с репозиторием нужно установить Node.js и менеджер пакетов npm

## Get started

1. Перед запуском нужно установить все зависимости

   ```bash
   npm install
   ```

2. Установить Expo Go



3. Запустить проект командой

   ```bash
   npx expo start
   ```

После запуска предложатся следующие варианты

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/), Запускает эмулятор андроид (нужно установить Android studio)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/), **Только на макбуке** запускает эмулятор iOS
- [Expo Go](https://expo.dev/go), запускает приложение в Expo Go


4. Сканируем QR-код
**Все варианты запуска игнорируем** и сканируем QR-код, который будет в терминале
На айфоне: Сканируем QR-код и откроется проект в Expo
На андроиде: Сканируем QR-код через приложение Expo Go

## Для обновления приложения

1. Для обновления приложения (при изменениях в коде):
С мобильного устройства: Встряхиваем телефон -> Откроется модалка Expo -> Refresh
С компьютера: Нажимаем 'r'

# Чтобы раб#тать с приложением

Чтобы раб*тать с приложением нужно:
1) Сделать пулл [.NET-Back](https://github.com/onePlaySUAI/.NET-Back)
2) Скачать ngrok
3) Запустить бэк в VS code, выбрав протокол https
4) В терминале прописать 
```bash
 ngrok http 5000
```
5) В локальный .env файл этого проекта записать ссылку, которую вам дал ngrok
```bash
https://XXX.ngrok-free.dev/ 
```
