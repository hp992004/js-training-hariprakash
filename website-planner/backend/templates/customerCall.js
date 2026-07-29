export default function customerCall(data) {
  return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">

<style>

body{
margin:0;
padding:40px;
background:#eef2ff;
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

.booking{
margin-top:30px;
border:1px solid #e5e7eb;
border-radius:12px;
overflow:hidden;
}

.booking table{
width:100%;
border-collapse:collapse;
}

.booking td{
padding:16px;
border-bottom:1px solid #e5e7eb;
}

.booking tr:last-child td{
border-bottom:none;
}

.booking td:first-child{
background:#f8fafc;
font-weight:bold;
width:180px;
}

.note{
margin-top:30px;
padding:20px;
background:#f8fafc;
border-left:5px solid #7c3aed;
border-radius:10px;
}

.footer{
background:#0f172a;
color:#cbd5e1;
text-align:center;
padding:25px;
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

<h1>Discovery Call Confirmed 🎉</h1>

<p>We're excited to speak with you.</p>

</div>

<div class="content">

<h2>Hi ${data.name},</h2>

<p>

Thank you for scheduling a discovery call with
<strong>WebCraft Studio.</strong>

</p>

<p>

We've successfully reserved your preferred time slot.

</p>

<div class="booking">

<table>

<tr>
<td>Company</td>
<td>${data.company || "Not Provided"}</td>
</tr>

<tr>
<td>Email</td>
<td>${data.email}</td>
</tr>

<tr>
<td>Phone</td>
<td>${data.phone}</td>
</tr>

<tr>
<td>Date</td>
<td>${data.date}</td>
</tr>

<tr>
<td>Time Slot</td>
<td>${data.timeSlot}</td>
</tr>

</table>

</div>

<div class="note">

<h3>What happens next?</h3>

<p>📞 Our team will contact you at your selected time.</p>

<p>💡 We'll discuss your project requirements.</p>

<p>📄 You'll receive recommendations and a quotation.</p>

<p>🚀 If everything looks good, we'll start building your website.</p>

</div>

<p>

If you need to reschedule your call, simply reply to this email.

</p>

<p>

See you soon!

</p>

<p>

Regards,<br>

<strong>WebCraft Studio Team</strong>

</p>

</div>

<div class="footer">

<strong>WebCraft Studio</strong><br>

Professional Website Design & Development

</div>

</div>

</body>

</html>
`;
}