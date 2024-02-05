'use client'

import { Text, Button } from '@mantine/core';
import { Template, generate, BLANK_PDF } from '@pdfme/generator';

export function MyTicketUuid({ row }) {

  function onCreatePdfClick() {
    const template: Template = {
      basePdf: BLANK_PDF,
      schemas: [
        {
          a: {
            type: 'text',
            position: { x: 0, y: 0 },
            width: 100,
            height: 24,
          },
          b: {
            type: 'text',
            position: { x: 0, y: 24 },
            width: 100,
            height: 24,
          },
          c: {
            type: 'text',
            position: { x: 0, y: 48 },
            width: 100,
            height: 24,
          },
          qrCode: {
            type: 'qrcode',
            position: { x: 0, y: 72 },
            width: 100,
            height: 100,
          }
        },
      ],
    };

    const inputs = [{
      a: row.email,
      b: `buy the ${row.created_on}`,
      c: 'this is a test, Hello World',
      qrCode: `www.manifiesta.be/${row.code}`
    }];

    generate({ template, inputs }).then((pdf) => {
      console.log(pdf);
      // Browser
      const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
      window.open(URL.createObjectURL(blob));
    });
  }

  return (
    <>
      <Text>My ticket: {row.code}</Text>
      <Button m="sm" onClick={onCreatePdfClick}>Download my ticket</Button>
    </>
  )
}