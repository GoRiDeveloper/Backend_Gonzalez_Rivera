const 

D               = document,
SOCKET          = io(),
BUTTON_PRODS    = D.querySelector(".show-prods"),
TABLE_CONTAINER = D.querySelector(".table"),
FORM            = D.querySelector(".form-input"),
MSG_CONTAINER   = D.querySelector(".messages-chat"),
LOGOUT          = D.querySelector(".logout"),
LOGOUT_BUTTON   = D.querySelector(".nav-button"),
WELCOME         = D.querySelector(".welcome"),
ERROR           = D.querySelector(".error"),
EMAIL_MSG       = D.querySelector("#email"),
NAME_MSG        = D.querySelector("#name"),
LASTNAME_MSG    = D.querySelector("#lastname"),
AGE_MSG         = D.querySelector("#age"),
ALIAS_MSG       = D.querySelector("#alias"),
AVATAR_MSG      = D.querySelector("#avatar"),
MSG_MSG         = D.querySelector("#message");