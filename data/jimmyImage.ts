// ==============================================================================
// OHJEET KUVAN VAIHTAMISEEN (BASE64):
// 1. Mene selaimella osoitteeseen: https://www.base64-image.de/
// 2. Lataa haluamasi kuva sivustolle.
// 3. Klikkaa "Copy Image" tai kopioi koodi joka alkaa "data:image/..."
// 4. Liitä tuo pitkä koodirimsu alla olevan 'PASTE_YOUR_BASE64_HERE' muuttujan
//    lainausmerkkien väliin.
// ==============================================================================

const PASTE_YOUR_BASE64_HERE = "";

// ==============================================================================
// ÄLÄ KOSKE ALLA OLEVAAN KOODIIN
// Peli käyttää tätä logiikkaa: Jos olet liittänyt ylös koodin, peli käyttää sitä.
// Muuten peli käyttää oletuskuvaa.

const DEFAULT_IMAGE = "https://placehold.co/400x400/1e293b/4ade80?text=JIMMY";

export const JIMMY_IMAGE_SRC = PASTE_YOUR_BASE64_HERE || DEFAULT_IMAGE;
