import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearcart } from "../utilis/cartslice";
import { useNavigate } from "react-router-dom";

// ─── tiny hook: animated counter ───
function useCountUp(target, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return val;
}

// ─── QR SVG (fake but realistic-looking) ───
const FakeQR = () => (
  <svg viewBox="0 0 200 200" width="180" height="180" style={{ display: "block" }}>
    <rect width="200" height="200" fill="#fff" />
    {[[10,10],[140,10],[10,140]].map(([x,y],i) => (
      <g key={i}>
        <rect x={x} y={y} width="50" height="50" fill="none" stroke="#1a1a2e" strokeWidth="8" rx="4"/>
        <rect x={x+12} y={y+12} width="26" height="26" fill="#1a1a2e" rx="2"/>
      </g>
    ))}
    {[
      [75,10],[85,10],[95,10],[105,10],[115,10],
      [75,20],[95,20],[115,20],
      [75,30],[85,30],[95,30],[105,30],
      [75,40],[105,40],[115,40],
      [75,50],[85,50],[95,50],[115,50],
      [10,75],[20,75],[40,75],[50,75],
      [10,85],[30,85],[50,85],
      [10,95],[20,95],[30,95],[40,95],[50,95],
      [10,105],[40,105],
      [10,115],[20,115],[30,115],[50,115],
      [75,75],[95,75],[105,75],[115,75],[125,75],[135,75],
      [75,85],[85,85],[105,85],[125,85],
      [75,95],[85,95],[95,95],[115,95],[135,95],
      [75,105],[95,105],[105,105],[115,105],[125,105],
      [75,115],[85,115],[105,115],[125,115],[135,115],
      [75,125],[95,125],[115,125],[135,125],
      [75,135],[85,135],[95,135],[105,135],[115,135],[125,135],[135,135],
      [160,75],[170,75],[180,75],
      [160,85],[180,85],
      [160,95],[170,95],[180,95],
      [160,105],[170,105],
      [160,115],[170,115],[180,115],
      [160,125],[180,125],
      [160,135],[170,135],[180,135],
      [160,145],[170,145],
      [160,155],[170,155],[180,155],
      [10,155],[30,155],[50,155],
      [10,165],[20,165],[40,165],[50,165],
      [10,175],[20,175],[30,175],[50,175],
    ].map(([x,y],i) => (
      <rect key={i} x={x} y={y} width="8" height="8" fill="#1a1a2e" rx="1"/>
    ))}
  </svg>
);

export default function Checkout() {
  const cartItems = useSelector(s => s.cart.items);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const total = cartItems.reduce((a, i) => a + (i?.price || i?.defaultPrice || 0) / 100, 0);
  const gst   = +(total * 0.05).toFixed(2);
  const toPay = +(total * 1.05).toFixed(2);

  const [stage, setStage]       = useState(0);
  const [pin, setPin]           = useState(["","","","",""]);
  const [scanLine, setScanLine] = useState(0);
  const [shake, setShake]       = useState(false);
  const [dots, setDots]         = useState(0);
  const inputRefs               = useRef([]);
  const countedTotal            = useCountUp(stage === 3 ? toPay : 0, 1000);

  useEffect(() => {
    if (stage !== 0) return;
    const t = setInterval(() => setScanLine(p => (p + 1) % 100), 18);
    return () => clearInterval(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== 2) return;
    const t = setInterval(() => setDots(p => (p + 1) % 4), 400);
    setTimeout(() => { clearInterval(t); setStage(3); }, 3000);
    return () => clearInterval(t);
  }, [stage]);

  const handlePinChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...pin];
    next[idx] = val;
    setPin(next);
    if (val && idx < 4) inputRefs.current[idx + 1]?.focus();
  };

  const handlePinKey = (e, idx) => {
    if (e.key === "Backspace" && !pin[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const submitPin = () => {
    if (pin.join("").length < 5) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setStage(2);
  };

  const goHome = () => {
    dispatch(clearcart());
    navigate("/");
  };

  return (
    <div style={styles.page}>
      {/* ── left panel ── */}
      <div style={styles.leftPanel}>
        <div style={styles.leftInner}>
          <p style={styles.orderLabel}>ORDER SUMMARY</p>
          <div style={styles.itemsList}>
            {cartItems.map((item, i) => (
              <div key={i} style={styles.orderItem}>
                <span style={styles.itemDot}>●</span>
                <span style={styles.itemName}>{item?.name}</span>
                <span style={styles.itemAmt}>₹{((item?.price || item?.defaultPrice || 0) / 100).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div style={styles.divider} />
          <div style={styles.billRow}><span style={styles.billLbl}>Subtotal</span><span style={styles.billVal}>₹{total.toFixed(2)}</span></div>
          <div style={styles.billRow}><span style={styles.billLbl}>Delivery</span><span style={{...styles.billVal, color:"#22c55e"}}>FREE</span></div>
          <div style={styles.billRow}><span style={styles.billLbl}>GST (5%)</span><span style={styles.billVal}>₹{gst}</span></div>
          <div style={styles.divider} />
          <div style={{...styles.billRow, marginTop: 4}}>
            <span style={styles.totalLbl}>TOTAL</span>
            <span style={styles.totalVal}>₹{toPay.toFixed(2)}</span>
          </div>
          <div style={styles.upiRow}>
            {["GPay","PhonePe","Paytm","BHIM"].map(u => (
              <div key={u} style={styles.upiChip}>{u}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── right panel ── */}
      <div style={styles.rightPanel}>

        {/* STAGE 0: QR SCANNER */}
        {stage === 0 && (
          <div style={styles.card}>
            <div style={styles.cardTop}>
              <span style={styles.cardEmoji}>📱</span>
              <h2 style={styles.cardTitle}>Scan & Pay</h2>
              <p style={styles.cardSub}>Use any UPI app to scan this QR code</p>
            </div>
            <div style={styles.qrWrapper}>
              <div style={styles.qrBox}>
                <FakeQR />
                <div style={{ ...styles.scanLine, top: `${scanLine}%` }}>
                  <div style={styles.scanGlow} />
                </div>
              </div>
              <div style={styles.qrAmtBadge}>₹{toPay.toFixed(2)}</div>
            </div>
            <p style={styles.upiId}>UPI ID: foodapp@ybl</p>
            <div style={styles.orRow}>
              <div style={styles.orLine}/><span style={styles.orText}>OR</span><div style={styles.orLine}/>
            </div>
            <button style={styles.primaryBtn} onClick={() => setStage(1)}>
              Enter UPI PIN manually →
            </button>
          </div>
        )}

        {/* STAGE 1: PIN ENTRY */}
        {stage === 1 && (
          <div style={styles.card}>
            <div style={styles.cardTop}>
              <span style={styles.cardEmoji}>🔐</span>
              <h2 style={styles.cardTitle}>Enter UPI PIN</h2>
              <p style={styles.cardSub}>Your 5-digit secret PIN</p>
            </div>
            <div style={{ ...styles.pinRow, ...(shake ? styles.shake : {}) }}>
              {pin.map((d, i) => (
                <input
                  key={i}
                  ref={el => inputRefs.current[i] = el}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={e => handlePinChange(e.target.value, i)}
                  onKeyDown={e => handlePinKey(e, i)}
                  style={{
                    ...styles.pinBox,
                    borderColor: d ? "#fc8019" : "#e2e8f0",
                    boxShadow: d ? "0 0 0 3px rgba(252,128,25,0.2)" : "none",
                  }}
                  autoFocus={i === 0}
                />
              ))}
            </div>
            <p style={styles.pinHint}>Hint: any 5 digits work 😄</p>
            <button
              style={{ ...styles.primaryBtn, opacity: pin.join("").length < 5 ? 0.5 : 1 }}
              onClick={submitPin}
            >
              Pay ₹{toPay.toFixed(2)}
            </button>
            <button style={styles.ghostBtn} onClick={() => setStage(0)}>
              ← Back to QR
            </button>
          </div>
        )}

        {/* STAGE 2: PROCESSING */}
        {stage === 2 && (
          <div style={styles.card}>
            <div style={styles.processingWrap}>
              <div style={styles.spinnerRing} />
              <h2 style={styles.processingTitle}>Processing{".".repeat(dots)}</h2>
              <p style={styles.processingDesc}>Communicating with your bank securely</p>
              <div style={styles.processingSteps}>
                {["Verifying PIN","Debiting amount","Confirming order"].map((s,i) => (
                  <div key={i} style={{
                    ...styles.step,
                    opacity: dots > i ? 1 : 0.3,
                    transform: dots > i ? "translateX(0)" : "translateX(-8px)",
                  }}>
                    <span style={{ ...styles.stepDot, background: dots > i ? "#fc8019" : "#e2e8f0" }}/>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: SUCCESS */}
        {stage === 3 && (
          <div style={styles.card}>
            <div style={styles.successWrap}>
              <div style={styles.successRing}>
                <div style={styles.checkCircle}>
                  <svg viewBox="0 0 52 52" width="52" height="52">
                    <circle cx="26" cy="26" r="25" fill="none" stroke="#22c55e" strokeWidth="2"/>
                    <path d="M14 26 l8 8 l16-16" fill="none" stroke="#22c55e" strokeWidth="3"
                      strokeLinecap="round" strokeLinejoin="round"
                      style={{ strokeDasharray: 40, strokeDashoffset: 0, animation: "dash 0.5s ease forwards" }}
                    />
                  </svg>
                </div>
              </div>
              <h2 style={styles.successTitle}>Payment Successful!</h2>
              <div style={styles.paidAmt}>₹{countedTotal.toFixed(2)}</div>
              <p style={styles.successSub}>Paid to <strong>FoodApp Pvt Ltd</strong></p>
              <div style={styles.successMeta}>
                <div style={styles.metaRow}>
                  <span style={styles.metaLbl}>Transaction ID</span>
                  <span style={styles.metaVal}>TXN{Math.floor(Math.random()*9e11+1e11)}</span>
                </div>
                <div style={styles.metaRow}>
                  <span style={styles.metaLbl}>Date</span>
                  <span style={styles.metaVal}>{new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</span>
                </div>
                <div style={styles.metaRow}>
                  <span style={styles.metaLbl}>Time</span>
                  <span style={styles.metaVal}>{new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</span>
                </div>
                <div style={styles.metaRow}>
                  <span style={styles.metaLbl}>Status</span>
                  <span style={{...styles.metaVal, color:"#22c55e", fontWeight:700}}>● SUCCESS</span>
                </div>
              </div>
              <div style={styles.orderBanner}>
                🎉 Your order has been placed! Estimated delivery: <strong>30–40 mins</strong>
              </div>
              <button style={styles.primaryBtn} onClick={goHome}>
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes shake {
          0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}   60%{transform:translateX(-6px)}
          80%{transform:translateX(6px)}
        }
        @keyframes dash  { from{stroke-dashoffset:40} to{stroke-dashoffset:0} }
        @keyframes pop   { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

const styles = {
  page:          { minHeight:"100vh", display:"flex", background:"#f8fafc", fontFamily:"'Segoe UI',sans-serif" },
  leftPanel:     { width:340, minWidth:280, background:"#1a1a2e", color:"#fff", display:"flex", flexDirection:"column", padding:"48px 32px" },
  leftInner:     { display:"flex", flexDirection:"column", gap:12 },
  orderLabel:    { fontSize:11, fontWeight:700, letterSpacing:"0.15em", color:"#94a3b8", marginBottom:8 },
  itemsList:     { display:"flex", flexDirection:"column", gap:8, marginBottom:4 },
  orderItem:     { display:"flex", alignItems:"center", gap:8, fontSize:14, color:"#cbd5e1" },
  itemDot:       { color:"#fc8019", fontSize:8, flexShrink:0 },
  itemName:      { flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" },
  itemAmt:       { fontWeight:700, color:"#f1f5f9", flexShrink:0 },
  divider:       { height:1, background:"rgba(255,255,255,0.1)", margin:"8px 0" },
  billRow:       { display:"flex", justifyContent:"space-between", fontSize:14 },
  billLbl:       { color:"#94a3b8" },
  billVal:       { color:"#f1f5f9", fontWeight:600 },
  totalLbl:      { color:"#fff", fontWeight:800, fontSize:16 },
  totalVal:      { color:"#fc8019", fontWeight:800, fontSize:18 },
  upiRow:        { display:"flex", gap:8, flexWrap:"wrap", marginTop:24 },
  upiChip:       { padding:"4px 12px", borderRadius:20, border:"1px solid rgba(255,255,255,0.15)", fontSize:11, color:"#94a3b8", fontWeight:600 },
  rightPanel:    { flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 24px" },
  card:          { background:"#fff", borderRadius:24, boxShadow:"0 20px 60px rgba(0,0,0,0.12)", padding:"40px 36px", width:"100%", maxWidth:420, display:"flex", flexDirection:"column", gap:20, animation:"slideUp 0.4s ease" },
  cardTop:       { textAlign:"center" },
  cardEmoji:     { fontSize:40, display:"block", marginBottom:8 },
  cardTitle:     { fontSize:24, fontWeight:800, color:"#1a1a2e", margin:"0 0 6px" },
  cardSub:       { fontSize:14, color:"#94a3b8", margin:0 },
  qrWrapper:     { display:"flex", flexDirection:"column", alignItems:"center", gap:16 },
  qrBox:         { position:"relative", border:"3px solid #f0f0f0", borderRadius:16, padding:12, overflow:"hidden", background:"#fff", boxShadow:"0 4px 20px rgba(0,0,0,0.08)" },
  scanLine:      { position:"absolute", left:0, right:0, height:2, background:"rgba(252,128,25,0.7)", transition:"top 0.018s linear", zIndex:10 },
  scanGlow:      { position:"absolute", top:-6, left:0, right:0, height:14, background:"linear-gradient(transparent,rgba(252,128,25,0.15),transparent)" },
  qrAmtBadge:    { background:"#fc8019", color:"#fff", fontWeight:800, fontSize:20, padding:"8px 28px", borderRadius:50, letterSpacing:"0.02em" },
  upiId:         { textAlign:"center", fontSize:13, color:"#94a3b8", letterSpacing:"0.05em", fontWeight:600, margin:0 },
  orRow:         { display:"flex", alignItems:"center", gap:12 },
  orLine:        { flex:1, height:1, background:"#e2e8f0" },
  orText:        { fontSize:12, color:"#94a3b8", fontWeight:700 },
  primaryBtn:    { width:"100%", padding:"14px", background:"#fc8019", color:"#fff", border:"none", borderRadius:12, fontSize:16, fontWeight:800, cursor:"pointer", letterSpacing:"0.02em", boxShadow:"0 4px 16px rgba(252,128,25,0.4)", transition:"transform 0.1s, opacity 0.2s" },
  ghostBtn:      { width:"100%", padding:"12px", background:"transparent", color:"#94a3b8", border:"1.5px solid #e2e8f0", borderRadius:12, fontSize:14, fontWeight:600, cursor:"pointer" },
  pinRow:        { display:"flex", justifyContent:"center", gap:12 },
  shake:         { animation:"shake 0.4s ease" },
  pinBox:        { width:52, height:60, textAlign:"center", fontSize:28, fontWeight:800, border:"2px solid", borderRadius:12, outline:"none", background:"#f8fafc", color:"#1a1a2e", transition:"border-color 0.2s, box-shadow 0.2s" },
  pinHint:       { textAlign:"center", fontSize:12, color:"#94a3b8", margin:0 },
  processingWrap:{ display:"flex", flexDirection:"column", alignItems:"center", gap:20, padding:"20px 0" },
  spinnerRing:   { width:72, height:72, border:"4px solid #f0f0f0", borderTop:"4px solid #fc8019", borderRadius:"50%", animation:"spin 0.8s linear infinite" },
  processingTitle:{ fontSize:22, fontWeight:800, color:"#1a1a2e", margin:0, minWidth:180, textAlign:"center" },
  processingDesc:{ fontSize:14, color:"#94a3b8", margin:0, textAlign:"center" },
  processingSteps:{ display:"flex", flexDirection:"column", gap:10, alignSelf:"stretch" },
  step:          { display:"flex", alignItems:"center", gap:10, fontSize:14, color:"#475569", fontWeight:500, transition:"opacity 0.4s, transform 0.4s" },
  stepDot:       { width:10, height:10, borderRadius:"50%", flexShrink:0, transition:"background 0.4s" },
  successWrap:   { display:"flex", flexDirection:"column", alignItems:"center", gap:16 },
  successRing:   { width:90, height:90, border:"3px solid #dcfce7", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", animation:"pop 0.5s cubic-bezier(.36,.07,.19,.97)", background:"#f0fdf4" },
  checkCircle:   { animation:"pop 0.6s 0.1s cubic-bezier(.36,.07,.19,.97) both" },
  successTitle:  { fontSize:26, fontWeight:800, color:"#1a1a2e", margin:0 },
  paidAmt:       { fontSize:42, fontWeight:900, background:"linear-gradient(135deg,#fc8019,#e5720f)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:"-1px" },
  successSub:    { fontSize:14, color:"#94a3b8", margin:0 },
  successMeta:   { background:"#f8fafc", borderRadius:12, padding:"16px 20px", width:"100%", display:"flex", flexDirection:"column", gap:10 },
  metaRow:       { display:"flex", justifyContent:"space-between", fontSize:13 },
  metaLbl:       { color:"#94a3b8" },
  metaVal:       { color:"#1a1a2e", fontWeight:600, fontFamily:"monospace" },
  orderBanner:   { background:"linear-gradient(135deg,#fff7ed,#ffedd5)", border:"1.5px solid #fed7aa", borderRadius:12, padding:"14px 18px", fontSize:14, color:"#92400e", textAlign:"center", lineHeight:1.5, width:"100%" },
};