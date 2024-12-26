# Eş Zamanlı Sipariş ve Stok Yönetimi Uygulaması

Bu proje, işletmelerin operasyonel süreçlerini dijitalleştirmek ve verimliliklerini artırmak için multithreading ve senkronizasyon mekanizmalarını kullanan bir sipariş ve stok yönetimi sistemidir. Sistem, ASP.NET Core, React Vite ve Microsoft SQL Server teknolojileriyle geliştirilmiştir.

## 🚀 Projenin Amacı

- Multithreading ve senkronizasyon mekanizmalarını kullanarak eş zamanlı veri erişim problemlerini çözmek.
- İşletmelerin stok ve sipariş süreçlerini dijitalleştirerek daha kullanıcı dostu ve güvenli bir çözüm sunmak.
- SignalR ile gerçek zamanlı bildirimler ve JWT tabanlı kimlik doğrulama ile güvenli erişim sağlamak.

## 📋 Özellikler

- **Sipariş ve Stok Yönetimi**: Siparişlerin ve stokların eş zamanlı yönetimi.
- **Admin ve Kullanıcı Sistemleri**: Farklı yetkilere sahip kullanıcı rolleri.
- **Gerçek Zamanlı Bildirimler**: SignalR ile sipariş durumları ve hata günlükleri.
- **Katmanlı Mimari**: Controller, Service, Repository ve Database katmanları.
- **Güvenlik ve Loglama**: JWT ile kimlik doğrulama ve loglama mekanizmaları.

## 🛠️ Kullanılan Teknolojiler

- **Backend**: ASP.NET Core, Entity Framework Core
- **Frontend**: React Vite
- **Veritabanı**: Microsoft SQL Server
- **Gerçek Zamanlı Bildirim**: SignalR
- **Kimlik Doğrulama**: JWT (JSON Web Token)

## 📂 Proje Yapısı

### Backend Katmanları
- **Controller Katmanı**: Kullanıcı isteklerini karşılar ve iş mantığına yönlendirir.
- **Service Katmanı**: İş kurallarını ve mantıksal işlemleri barındırır.
- **Repository Katmanı**: Veritabanı işlemlerini yönetir.
- **Database Katmanı**: Veritabanı şeması ve ilişkiler.

### Frontend Bileşenleri
- **Müşteri İşlemleri**: Kullanıcı kaydı, giriş, sipariş ve profil yönetimi.
- **Admin Paneli**: Ürün, kullanıcı ve sipariş yönetimi.
- **Log İzleme**: Gerçek zamanlı log takibi.

## 📈 Deneysel Sonuçlar

- Ortalama sipariş işleme süresi: 150ms
- Eş zamanlı kullanıcı kapasitesi: 500 kullanıcı
- Gerçek zamanlı bildirim gecikmesi: <50ms
- Hata günlükleri iletimi: 30ms

## ⏳ Kurulum

### Gereksinimler
- .NET 6 SDK
- Node.js (v16 veya üstü)
- SQL Server

### Adımlar

1. **Backend için**:
   ```bash
   cd backend
   dotnet restore
   dotnet run
   ```

2. **Frontend için**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Veritabanı Ayarları**:
   - `appsettings.json` dosyasındaki SQL Server bağlantı dizesini güncelleyin.

## 🌟 Önemli Bileşenler

- **AdminController**: Admin yetkisine sahip kullanıcılar için özel işlevler.
- **OrdersController**: Sipariş oluşturma ve görüntüleme işlemleri.
- **ProductsController**: Ürün ekleme, güncelleme ve listeleme.
- **SignalR**: Gerçek zamanlı bildirim mekanizması.

## 🤝 Katkıda Bulunun

Bu projeye katkıda bulunmak isterseniz, lütfen bir **pull request** gönderin veya bir **issue** açın.

## 📄 Lisans

Bu proje MIT Lisansı ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına göz atabilirsiniz.
