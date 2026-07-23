export default function customerPlan(data) {
  return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">

<style>

body{
margin:0;
padding:40px;
background:#edf2f7;
font-family:Arial,Helvetica,sans-serif;
}

.container{
max-width:700px;
margin:auto;
background:white;
border-radius:18px;
overflow:hidden;
box-shadow:0 10px 35px rgba(0,0,0,.12);
}

.header{
background:linear-gradient(135deg,#7c3aed,#5b21b6);
padding:40px;
text-align:center;
color:white;
}

.header h1{
margin:0;
font-size:34px;
}

.header p{
margin-top:10px;
font-size:16px;
opacity:.9;
}

.content{
padding:40px;
color:#334155;
line-height:1.8;
}

.content h2{
margin-top:0;
color:#111827;
}

.summary{
margin-top:30px;
border:1px solid #e2e8f0;
border-radius:12px;
overflow:hidden;
}

.summary table{
width:100%;
border-collapse:collapse;
}

.summary td{
padding:14px 18px;
border-bottom:1px solid #e2e8f0;
}

.summary tr:last-child td{
border-bottom:none;
}

.summary td:first-child{
background:#f8fafc;
font-weight:bold;
width:180px;
}

.next{
margin-top:35px;
background:#f8fafc;
padding:25px;
border-left:5px solid #7c3aed;
border-radius:10px;
}

.footer{
background:#0f172a;
padding:25px;
text-align:center;
color:#cbd5e1;
font-size:14px;
}

.footer strong{
color:white;
}

</style>

</head>

<body>

<div class="container">

<div class="header">

<h1>WebCraft Studio</h1>

<p>Your website journey starts here 🚀</p>

</div>

<div class="content">

<h2>Hi ${data.business},</h2>

<p>

Thank you for choosing
<strong>WebCraft Studio</strong>.

We've successfully received your website planning request.

</p>

<p>

Our team is reviewing your requirements and will get back to you within
<strong>24 hours.</strong>

</p>

<div class="summary">

<table>

<tr>
<td>Business</td>
<td>${data.business}</td>
</tr>

<tr>
<td>Website Type</td>
<td>${data.websiteType}</td>
</tr>

<tr>
<td>Pages</td>
<td>${data.pages}</td>
</tr>

<tr>
<td>Budget</td>
<td>${data.budget}</td>
</tr>

</table>

</div>

<div class="next">

<h3>What happens next?</h3>

<p>✅ Our team reviews your requirements.</p>

<p>✅ We prepare a personalized proposal.</p>

<p>✅ We'll contact you through your email.</p>

<p>✅ Once approved, development begins.</p>

</div>

<p>

If you have any questions, simply reply to this email.

</p>

<p>

Thank you for trusting us.

</p>

<p>

Regards,<br>

<strong>WebCraft Studio Team</strong>

</p>

</div>

<div class="footer">

<strong>WebCraft Studio</strong><br>

Building modern websites for businesses.

</div>

</div>

</body>

</html>
`;
}