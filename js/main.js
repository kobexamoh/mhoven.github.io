// initialize and declare the variable(s)
var hamburgerOpen = document.querySelector('#hamburger-open');
var hamburgerClose = document.querySelector('#hamburger-close');
var mobileNavigationMenu = document.querySelector('.navigation-block');
var desktopBreakpoint = window.matchMedia('(min-width: 1024px)');

// add event listeners
hamburgerOpen.addEventListener('click', menuOpen);
hamburgerClose.addEventListener('click', menuClose);
document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape' && hamburgerOpen.getAttribute('aria-expanded') === 'true') {
        menuClose();
    }
}); // close menu when 'Escape' key pressed and menu is open

desktopBreakpoint.addEventListener('change', function(evt) {
    var focusedElement = document.activeElement; // for determining if focus was inside the mobile menu when desktop breakpoint was reached

    if (evt.matches) {
        // when entering desktop width, close the mobile menu.
        var focusWasOnMobileNavigation = mobileNavigationMenu.contains(document.activeElement) || focusedElement === hamburgerOpen;

        menuClose();

        // if focus was inside the mobile menu when desktop breakpoint was reached, move focus to the desktop Home link.
        if (focusWasOnMobileNavigation) {
            document.querySelector('#homepage-link').focus();
        }
    } else {
        var focusWasOnDesktopNavigation = document.querySelector('.navigation-desktop').contains(focusedElement);

        if (focusWasOnDesktopNavigation) {
            hamburgerOpen.focus();
        }
    }
});

document.body.classList.remove('navigation-fallback'); // since menu controls are ready, no need to use the fallback navigation styles

// create the functions
function menuOpen() {
    hamburgerOpen.setAttribute('aria-expanded', 'true');

    // hide the 'hamburger-open' menu icon
    hamburgerOpen.style.display = 'none';

    // reveal the 'hamburger-close' menu icon
    hamburgerClose.style.display = 'block';

    // reveal the mobile navigation
    mobileNavigationMenu.style.display = 'block';

    // after menu is open, set focus to the 'hamburger-close' button so that user can close the menu with their keyboard
    hamburgerClose.focus();
}

function menuClose() {
    hamburgerOpen.setAttribute('aria-expanded', 'false');

    // hide the 'hamburger-close' menu icon
    hamburgerClose.style.display = 'none';

    // reveal the 'hamburger-open' menu icon
    hamburgerOpen.style.display = 'block';

    // hide the mobile navigation
    mobileNavigationMenu.style.display = 'none';

    // after menu is closed, set focus to the 'hamburger-open' button so that user can open the menu with their keyboard
    if (!desktopBreakpoint.matches) {
        hamburgerOpen.focus(); // only set focus to the open button if the user is still in the mobile viewport size. If the user is in desktop size...focus will be on the desktop navigation.
    }
}