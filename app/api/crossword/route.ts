export const dynamic = "force-static";

const crosswordHtml = `<!doctype html>
<html lang="en">
  <head>
    <base href="https://www.boatloadpuzzles.com/" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html,
      body {
        margin: 0;
        min-height: 100%;
        background: #f7f3ea;
      }

      body {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        font-family: Arial, sans-serif;
        overflow: auto;
      }

      p {
        margin: 18px;
        color: #2a2622;
      }

      body > iframe {
        flex: 0 0 auto;
      }

      @media (max-width: 620px) {
        body {
          justify-content: flex-start;
        }
      }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      boatload_puzzles_format = 'Landscape';
    </script>
    <p>Loading <a href="https://www.boatloadpuzzles.com/playcrossword">crossword puzzle</a>. One moment please.</p>
    <script type="text/javascript" src="https://www.boatloadpuzzles.com/Crossword.js"></script>
  </body>
</html>`;

export function GET() {
  return new Response(crosswordHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
