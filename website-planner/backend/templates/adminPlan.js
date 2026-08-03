export default function adminPlan(data) {
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
max-width:750px;
margin:auto;
background:white;
border-radius:18px;
overflow:hidden;
box-shadow:0 10px 35px rgba(0,0,0,.12);
}

.header{
background:#0f172a;
padding:35px;
text-align:center;
color:white;
}

.header h1{
margin:0;
font-size:30px;
}

.badge{
display:inline-block;
margin-top:12px;
padding:8px 18px;
background:#7c3aed;
border-radius:999px;
font-size:14px;
}

.content{
padding:40px;
}

.content h2{
margin-top:0;
color:#111827;
}

.info{
margin-top:30px;
border:1px solid #e5e7eb;
border-radius:12px;
overflow:hidden;
}

.info table{
width:100%;
border-collapse:collapse;
}

.info td{
padding:16px;
border-bottom:1px solid #e5e7eb;
vertical-align:top;
}

.info tr:last-child td{
border-bottom:none;
}

.info td:first-child{
width:180px;
font-weight:bold;
background:#f8fafc;
}

.description{
margin-top:30px;
padding:25px;
background:#f8fafc;
border-radius:12px;
border-left:5px solid #7c3aed;
}

.footer{
background:#0f172a;
padding:20px;
text-align:center;
color:#cbd5e1;
font-size:14px;
}

</style>

</head>

<body>

<div class="container">

<div class="header">

<h1>New Website Project Request</h1>

<div class="badge">
Action Required
</div>

</div>

<div class="content">

<h2>A new customer has submitted a project request.</h2>

<div class="info">

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

<tr>
<td>Email</td>
<td>${data.email}</td>
</tr>

<tr>
<td>Features</td>
<td>${Array.isArray(data.features) ? data.features.join(", ") : "None Selected"}</td>
</tr>

</table>

</div>

<div class="description">

<h3>Project Description</h3>

<p>
${data.description || "No description provided."}
</p>

</div>

</div>

<div class="footer">

WebCraft Studio Admin Notification

</div>

</div>

</body>

</html>
`;
}