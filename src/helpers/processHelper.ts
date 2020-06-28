export function IsServer () {
    return ! (typeof window != 'undefined' && window.document);
}
export function IsClient () {
    return (typeof window != 'undefined' && window.document);
}