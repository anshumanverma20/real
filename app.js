const API = (window.API_URL || 'http://localhost:4000') + '/api';

// auth helpers
function saveToken(t){ localStorage.setItem('hbh_token', t); }
function getToken(){ return localStorage.getItem('hbh_token'); }
function authHeader(){ const t = getToken(); return t ? { 'Authorization': 'Bearer '+t } : {}; }

// properties
async function fetchProperties(q = {}){
  const qs = new URLSearchParams(q).toString();
  const res = await fetch(`${API}/properties?${qs}`);
  return res.json();
}

async function fetchProperty(id){
  const res = await fetch(`${API}/properties/${id}`);
  return res.json();
}

async function addProperty(payload){
  const res = await fetch(`${API}/properties`, {
    method:'POST', headers:{'Content-Type':'application/json', ...authHeader()},
    body: JSON.stringify(payload)
  });
  return res.json();
}

async function myProperties(){
  const res = await fetch(`${API}/properties/me/user`, { headers: authHeader() });
  return res.json();
}

// roommates
async function fetchRoommates(q = {}){
  const qs = new URLSearchParams(q).toString();
  const res = await fetch(`${API}/roommates?${qs}`);
  return res.json();
}

async function fetchRoommate(id){
  const res = await fetch(`${API}/roommates/${id}`);
  return res.json();
}

async function addRoommate(payload){
  const res = await fetch(`${API}/roommates`, {
    method:'POST', headers:{'Content-Type':'application/json', ...authHeader()},
    body: JSON.stringify(payload)
  });
  return res.json();
}

// auth
async function login(email, password){
  const res = await fetch(`${API}/auth/login`, {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({email, password})
  });
  if(!res.ok) throw new Error('Login failed');
  const { token } = await res.json();
  saveToken(token);
}

async function register(name, email, password){
  const res = await fetch(`${API}/auth/register`, {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({name, email, password})
  });
  if(!res.ok) throw new Error('Register failed');
  const { token } = await res.json();
  saveToken(token);
}

function logout(){ localStorage.removeItem('hbh_token'); window.location = '/'; }

export { fetchProperties, fetchProperty, addProperty, myProperties, fetchRoommates, fetchRoommate, addRoommate, login, register, logout };
