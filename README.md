# device-logistics-ui
Assessment - Device Logistics Vue App
**Design considerations**
**Diagrammatically: **

App.vue 
└── AppLayout.vue 
      ├── AppHeader.vue 
      ├── AppSidebar.vue 
      └── <router-view> 
           └── Dashboard.vue / Devices.vue / Shipments.vue / Quotations.vue

**Benefits:**
You can have any number of pages, all reusing the same layout. 
You can also define different layouts for different route groups: 
AuthLayout → for login/register pages (no sidebar) 
AppLayout → for portal/dashboard (with sidebar + header) 
State (e.g., Pinia) remains consistent across route changes. 
Easy to add nested layouts if needed

**1. Application source code structure**
<img width="576" height="1074" alt="image" src="https://github.com/user-attachments/assets/ad2feab2-d7a5-4fb6-8bbd-f82c761c3c87" />

**2. Dashboard - with charts**

**3. Device List**
<img width="1896" height="983" alt="Devices" src="https://github.com/user-attachments/assets/0504f3d8-7718-4f83-a2fe-ba99352c17e6" />

**3. Device Management - Add (non-functional - for illustration purposes only**)
<img width="1895" height="988" alt="1-1-Add Device" src="https://github.com/user-attachments/assets/b078230e-5284-4b53-acf8-b06f68f6c3c1" />

**4. Device Management - Edit (non-functional - for illustration purposes only**)
<img width="1892" height="988" alt="Edit Device" src="https://github.com/user-attachments/assets/3eaaca03-a87a-42fe-89e4-2c092027f32b" />

**5. Device Management - Delete (non-functional - for illustration purposes only**)
<img width="1895" height="980" alt="Delete Device" src="https://github.com/user-attachments/assets/b17fc04c-6fc4-4be6-99b6-af5ce932d11a" />

**6. Device Management - Deactivate (non-functional - for illustration purposes only**)
<img width="1896" height="987" alt="Deactivate Device" src="https://github.com/user-attachments/assets/f7391ef1-531a-4395-acdf-8ab3f0c5cf16" />

**7. Search Device**
<img width="1892" height="985" alt="Search Device" src="https://github.com/user-attachments/assets/93c5ad36-94f0-42e9-a456-8f259f141d5b" />

**8. Shipment**
<img width="1911" height="977" alt="Shipment - Start" src="https://github.com/user-attachments/assets/77535b87-d3f4-4052-855b-8de5ea234dd2" />

**8. Shipment - Detail Collapsed**
<img width="1917" height="988" alt="Shipment Detail - Collapsed" src="https://github.com/user-attachments/assets/8e815c13-ab2d-42bb-a893-61a070598d9e" />

**8. Shipment - Detail Expanded**
<img width="1907" height="987" alt="Shipment Detail - Expanded" src="https://github.com/user-attachments/assets/7249a9c0-96f5-46f2-9204-3fe0f1e998af" />

**8. Shipment - Tracker**
<img width="1918" height="982" alt="Shipment Tracker" src="https://github.com/user-attachments/assets/98f73276-eb1d-40d7-8064-887a5542b338" />

**8. Shipment - Tracker - Not Found**
<img width="1916" height="990" alt="Shipment Tracker - Not Found" src="https://github.com/user-attachments/assets/d19ec19e-129b-4ba9-a9ab-b8a58498a70e" />

**8. Quotation Generator**
<img width="1917" height="990" alt="Quotation Generator" src="https://github.com/user-attachments/assets/c71838b7-1f02-49b1-905b-c76e59978129" />

**8. Quotation Generator - Result**
<img width="1915" height="981" alt="Quotation Result" src="https://github.com/user-attachments/assets/97c0389b-f268-4d52-92cc-607f8d7605e3" />

**8. Quotation Generator - Reset**
<img width="1913" height="987" alt="Quotation Reset" src="https://github.com/user-attachments/assets/3f5bc5d4-0c61-4994-981c-54b9cffe2451" />



