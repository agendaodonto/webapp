export const setAuth = () => {
    const user = Cypress.env('user');
    const baseUrl = Cypress.env('service');
    const payload = {
        email: user.email,
        password: user.password,
    };

    cy.request({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload,
        url: `${baseUrl}/auth/token/login/`,
    }).then(response => {
        window.localStorage.setItem('auth_token', response.body.auth_token);

        cy.request({
            method: 'GET',
            url: `${baseUrl}/auth/me/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${window.localStorage.getItem('auth_token')}`,
            },
        }).then(userData => {
            window.localStorage.setItem('user_info', JSON.stringify(userData.body));
        });
    });
};