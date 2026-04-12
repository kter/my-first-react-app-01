export function ScriptX() {
  return (
    <div className="jq">
      <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js" async></script>
      Hello, ScriptX!
    </div>
  );
}

export function ScriptY() {
  return (
    <>
      <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js" async></script>
      <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/dist/lodash.min.js" async></script>
      <div className="jq"
        onClick={() => window.$ && $('.jq').css('background-color', 'yellow')}>
        Hello, ScriptY!
      </div>
    </>
  );
}

export default function ScriptBasic() {
  return (
    <>
      <scriptX />
      <ScriptY />
    </>
  );
}
