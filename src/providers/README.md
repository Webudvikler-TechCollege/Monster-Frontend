# Context Providers
Tænk på en context provider som en fælles rygsæk for din app. 

Den gemmer info om, om du er logget ind (fx et token og evt. brugerdata), så ALLE komponenter kan tjekke det uden at sende props rundt.

## Sådan sætter du det op
Wrap hele din app i provideren én gang - gerne i filen *main.jsx*:


```js
// main.jsx / App.jsx
import { AuthProvider } from "./AuthContext";

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
```
Det er vigtigt at provideren har din App komponent som et child component.
## Sådan bruger du det i en komponent
Den nemme måde med dit hook:
```js
import { useAuth } from "./AuthContext";

function Profile() {
  const { loginData, setLoginData } = useAuth();

  const isLoggedIn = Boolean(loginData);

  return (
    <div>
      {isLoggedIn ? (
        <p>Du er logget ind 🎉</p>
      ) : (
        <p>Ikke logget ind</p>
      )}
    </div>
  );
}
```
Du kan droppe useAuth custom hooket i bunden og kalde din provider direkte med useContext. Men hook’et er bare pænere.

**Eksempel:**
```js
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Profile() {
  const { loginData, setLoginData } = useContext(AuthContext);

  const isLoggedIn = Boolean(loginData);

  return (
    <div>
      {isLoggedIn ? (
        <p>Du er logget ind 🎉</p>
      ) : (
        <p>Ikke logget ind</p>
      )}
    </div>
  );
}
```
## Login & logout (helt simpelt)
Når din backend svarer med et token:
```js
function onLoginSuccess(tokenObj) {
  sessionStorage.setItem("access_token", JSON.stringify(tokenObj));
  // gør data tilgængelig i hele app'en
  setLoginData(tokenObj);
}
```
Når du logger ud:
```js
function logout() {
  sessionStorage.removeItem("access_token");
  setLoginData(""); // ryd konteksten
}
```