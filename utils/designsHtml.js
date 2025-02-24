export const registerMailDesign = ({name, code}) => {
	return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .header {
                background-color: #4CAF50;
                padding: 15px;
                border-radius: 8px 8px 0 0;
                color: white;
                font-size: 24px;
                font-weight: bold;
            }
            .content {
                padding: 20px;
            }
            .code {
                display: inline-block;
                background: #4CAF50;
                color: white;
                font-size: 22px;
                font-weight: bold;
                padding: 10px 20px;
                border-radius: 5px;
                letter-spacing: 2px;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #888;
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                margin-top: 20px;
                background-color: #4CAF50;
                color: white;
                font-size: 16px;
                font-weight: bold;
                text-decoration: none;
                border-radius: 5px;
            }
            .button:hover {
                background-color: #45a049;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                Verify Your Email
            </div>
            <div class="content">
                <p>Hello <b>${name}</b>,</p>
                <p>Thank you for signing up! Please use the verification code below to complete your registration.</p>
                <p class="code">${code}</p>
                <p>If you did not sign up, please ignore this email.</p>
            </div>
            <div class="footer">
                &copy; 2025 Your Company | All rights reserved.
            </div>
        </div>
    </body>
    </html>
    `;
};

export const verifyCodeDesign = (code) => {
	return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 500px;
                background: #ffffff;
                margin: 40px auto;
                padding: 20px;
                text-align: center;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            .logo {
                width: 100px;
            }
            h2 {
                color: #333;
            }
            .code {
                font-size: 24px;
                font-weight: bold;
                color: #007BFF;
                margin: 20px 0;
                padding: 10px;
                background: #f0f0f0;
                display: inline-block;
                border-radius: 5px;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <img class="logo" src="https://yourdomain.com/logo.png" alt="Logo">
            <p>Your verification code is:</p>
            <div class="code">${code}</div>
            <p>This code will expire in <strong>5 minutes</strong>. Do not share it with anyone.</p>
            <p>If you didn't request this, you can ignore this email.</p>
            <div class="footer">
                <p>&copy; 2025 Your Company. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>

    `;
};
