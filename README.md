# CRM OS

CRM Personal con Integración Profunda en el SO

## Descripcion

CRM Personal con funcionalidades nativas del sistema operativo (contactos, calendario, notificaciones), con lógica relacional inteligente en los permisos de cada Api utilizada, cuenta con una arquitectura basada en **Clean Architecture**, **MVVM**, **Feature First** y **Atomic Design**.

## Instalacion

### Requisitos

* **Node.js** ≥14.x
* **npm** o **Yarn**
* **Expo CLI**

```bash
npm install -g expo-cli
```

### Clonado del repositorio

```bash
git clone https://github.com/ange25-ca/CRM_OS.git
cd CRM_OS
```

### Instalacion de dependencias

Con **npm**:

```bash
npm install
```

Con **Yarn**:

```bash
yarn install
```

### Ejecucion

```bash
npm run start       
npm run android    
npm run ios         
npm run web         
```

## Estructura del proyecto

La aplicacion sigue un enfoque **Feature First** combinado con **Clean Architecture** y **Atomic Design**.

```bash
crm_os/
├── App.tsx
├── main.tsx
├── package.json
├── tsconfig.json
├── babel.config.js
├── features/
│   ├── contacts/
│   │   ├── data/
│   │   │   ├── persistence/contactsDb.ts
│   │   │   └── service/contactsService.ts
│   │   ├── domain/
│   │   │   └── entities/Contact.ts
│   │   ├── viewmodel/
│   │   │   └── useContactsStore.ts
│   │   ├── presentation/
│   │   │   ├── componentes/
│   │   │   │   ├── atoms/IconButtonAtom.tsx
│   │   │   │   ├── atoms/TagAtom.tsx
│   │   │   │   ├── molecules/addTagInput.tsx
│   │   │   │   ├── organisms/ContactItem.tsx
│   │   │   │   ├── organisms/NewContactModal.tsx
│   │   │   │   └── organisms/TagList.tsx
│   │   │   └── pages/
│   │   │       ├── ContactDetailScreen.tsx
│   │   │       └── ContactScreen.tsx
│   │   └── navigation/
│   │       ├── types/types.tsx
│   │       └── ContactStack.tsx
│   ├── calendar/
│   │   ├── data/
│   │   │   ├── persistence/calendarDb.ts
│   │   │   └── service/calendarService.ts
│   │   ├── domain/
│   │   │   └── useCases/calendarUseCases.ts
│   │   ├── viewmodel/
│   │   │   └── calendarStore.ts
│   │   ├── presentation/
│   │   │   ├── componentes/
│   │   │   │   ├── atoms/Button.tsx
│   │   │   │   ├── atoms/Day.tsx
│   │   │   │   ├── atoms/EventDot.tsx
│   │   │   │   ├── atoms/FabButton.tsx
│   │   │   │   └── atoms/HourLabel.tsx
│   │   │   ├── molecules/DateDisplay.tsx
│   │   │   ├── molecules/EventItem.tsx
│   │   │   └── molecules/FormField.tsx
│   │   │   ├── organisms/addEventForm.tsx
│   │   │   ├── organisms/CalendarView.tsx
│   │   │   └── organisms/HourCell.tsx
│   │   └── navigation/
│   │       ├── types/types.tsx
│   │       └── CalendarStack.tsx
│   ├── Settings/
│   │   └── Permissions/
│   │       ├── domain/
│   │       │   ├── calendarPermission.ts
│   │       │   └── contactsPermission.ts
│   │       ├── infra/
│   │       │   └── permissionStore.ts
│   │       ├── useCases/
│   │       │   └── permissionUseCases.ts
│   │       └── presentation/
│   │           ├── componentes/
│   │           │   ├── atoms/ToggleSwitch.tsx
│   │           │   ├── molecules/PermissionItem.tsx
│   │           │   ├── organisms/PermissionsList.tsx
│   │           │   └── pages/SettingsScreen.tsx
├── navigation/
│   ├── tabs/
│   │   ├── TabsNavigator.tsx
│   │   ├── types/Type.tsx
│   │   └── index.tsx
└── types/
    └── expo-sqlite-legacy.d.ts
└── README.md
```

## Librerias usadas y su proposito

| Libreria                                                                                                                    | Proposito                                                      |
| --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **expo**                                                                                                                    | Plataforma base para desarrollo de apps React Native           |
| **expo-asset**, **expo-file-system**, **expo-status-bar**                                                                   | Gestion de assets, filesystem y estado de la barra             |
| **expo-calendar**, **expo-contacts**, **expo-notifications**, **expo-sqlite**                                               | Integracion con servicios nativos de SO                        |
| **expo-router**                                                                                                             | Enrutamiento basado en archivos para Expo                      |
| **@react-navigation/native**, **@react-navigation/stack**, **@react-navigation/bottom-tabs**                                | Navegacion principal, pilas y pestañas                         |
| **react-native-screens**, **react-native-safe-area-context**, **react-native-gesture-handler**, **react-native-reanimated** | Optimizacion de pantallas, areas seguras, gestos y animaciones |
| **react-native-calendars**, **react-native-modal**                                                                          | Componentes de calendario y ventanas modales personalizables   |
| **@expo/vector-icons**, **react-native-vector-icons**                                                                       | Iconos vectoriales                                             |
| **zustand**                                                                                                                 | Manejo de estado global simple y reactivo                      |
| **react**, **react-native**                                                                                                 | Librerias fundamentales de UI                                  |
| **typescript**, **@babel/core**, **@types/react**                                                                           | Tipado estatico, transpilacion y definiciones de tipo          |
