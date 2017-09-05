# Authentication

The authenticated user is stored in `store/UX` upon a successful login.  That store has an `isAuthenticated()`
getter that simply checks for null.  This getter is used in `router/index` in `beforeEnter()` hooks.  This
means there are no round trips to the server just to see if the user is logged in, and to handle session timeout
if they are not.  So ...

For one thing, when the user logs in, the user is stored in localStorage (using PersistentState object in lib).
When the app is lodaed or reloaded, the ux.user is (potencially) initialied by this localStorage.  So reloads
won't bounce the user to the login page because state is initiaized to empty.

What about session timeout?  I have not implemented this yet, but the idea would be to track the cookie (if any)
that is used for session management on the server.  It woould be great if we can make the browser cookie an observable
so every time it changes we could examine the expires value.  Then we can use something like mobx-utils.now( expires-in )
to trigger a dialog just prior to expiration.  (react-session-timeout?).  The backend would need to have an authenticated ping
that could be called to refresh the cookie to cancel the timeout.

