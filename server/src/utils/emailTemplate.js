export const contactEmailTemplate = ({
  name,
  email,
  subject,
  message,
}) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
body{
    font-family:Arial,sans-serif;
    background:#f4f4f4;
    padding:30px;
}
.container{
    max-width:650px;
    margin:auto;
    background:white;
    border-radius:10px;
    overflow:hidden;
}
.header{
    background:#2563eb;
    color:white;
    text-align:center;
    padding:20px;
}
.content{
    padding:25px;
}
.label{
    font-weight:bold;
    color:#333;
}
.message{
    background:#f7f7f7;
    padding:15px;
    border-radius:8px;
    margin-top:10px;
    white-space:pre-line;
}
.footer{
    padding:15px;
    text-align:center;
    color:#666;
    font-size:14px;
}
</style>
</head>

<body>

<div class="container">

<div class="header">
<h2>📩 New Portfolio Contact</h2>
</div>

<div class="content">

<p><span class="label">Name:</span> ${name}</p>

<p><span class="label">Email:</span> ${email}</p>

<p><span class="label">Subject:</span> ${subject}</p>

<p class="label">Message:</p>

<div class="message">
${message}
</div>

</div>

<div class="footer">
This email was sent from your Portfolio Website.
</div>

</div>

</body>
</html>
`;