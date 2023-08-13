# Question-and-answer-platform
Süleyman Demirel Üniversitesi Bilgisayar Mühendisliği bölümünde Yazılım stajım için yapmış olduğum bir web uygulaması rest api servisidir.

## Web servisinin yapılma amacı
Stajım süresince Kurumsal, Adminin kullanıcıları kayıt ettiği, güvenliği yüksek seviyede olan, kurum içi soruların gene kurum içinde yanıtlanarak puan sistemi kasıldığı bir web servisi yazmak istedim.

## Web servisinin yaptıkları ve Güvenlik için ekstra yaptıklarım
### Adminin Yaptıkları:
- Kullanıcıları sisteme kayıt etmek 
- Kullanıcıları sistemden silmek
- Kullanıcı bilgilerini değiştirmek
- Kullanıcı bilgilerini getirmek

### Kullanıcının Yaptıkları: 
- Kullanıcı girişi/çıkışı
- Kullanıcının soru sorması
- Diğer kullanıcıların sorularına cevap verme
- Sorularına cevap veren kullanıcıların cevaplarını upvote yapma
- Kullanıcıların onaylanan cevapları kadar puan kazanması
- Kullanıcıların diğer kullanıcıların sorularını ve cevaplarını görüntülemesi

**Güvenlik için ekstra yaptıklarım:**
1. AccessToken değeri 15 dakika boyunca kullanılabilir olarak kalacak ve içerisinde userid,authority ve email değerlerini saklayacağız.
2. RefreshToken değerimiz ise 15 gün rediste aktif olarak tutulacak 15 gün sonunda redisten silinecek. 
3. xsrfToken değerimiz ve JWT_SECRET değerimizin ikisiyle birlikte acessToken oluşturacağız. xsrfToken değeri her acessToken oluşturmada yeniden oluşturulduğu için daha güvenli bir yapı var.
4. Çıkış yapan kullanıcıların accessToken'ları rediste 15 dakika boyunca blacklistte tutulacak böylece çıkış yapmış kullanıcıların accessTokenları tekrar kullanıma alınamayacak.
## Kullanılan Teknolojiler ve Araçlar
**Back-end:** ExpressJS  
**Veritabanı:** Postgresql  
**Veritabanı ORM:** Sequelize  
**Kimlik Doğrulama, Güvenlik:** JWT, rand-token, crypto  
**Validasyon İşlemleri :** Passport, passport-local  
**Cache Teknolojisi:** Redis  
**Test:** Postman  
**IDE:** Visual Studio Code  
**REST API Client:** Postman  
**Versiyonlama:** Git  
**Container Teknolojisi:** Docker, Docker-compose  

## Uygulamanın Kişisel Bilgisayarınıza İndirilmesi
**Uygulamayı github üzerinden indirip çalıştırmak için öncelikle bilgisarınızda node.js, npm, postgresql ve redisin kurulu olması gerekmektedir.**
- **Uygulamayı İndirmek İçin :**

```bash
git clone https://github.com/YusufDagdeviren/question-and-answer-platform.git
```

## **Kütüphanelerin Yüklenmesi**

Çalıştırmadan önce gerekli kütüphanelerin yüklenmesi gerekir. 

- Uygulama içindeki back-End klasörü içindeyken terminalde aşağıdaki komutu kullanarak bu kütüphaneleri yükleyin.

```bash
npm install
```
## Uygulamanın Çalıştırılması

### **.env Dosyasının ayarlanması**
- back-end dizinine girip .env klasörü oluşturmanız gerekiyor ve aşağıdaki bilgileri kendinize uygun bir şekilde girmeniz gerekiyor.
```bash
DB_HOST="localhost"
DB_USER="postgres"
DB_PASSWORD="YOUR_PASSWORD"
DB_NAME="YOUR_DB_NAME"
PORT=4000
JWT_SECRET="YOUR_JWT_SECRET_KEY"
CSRF_SECRET_KEY="YOUR_CSRF_SECRET_KEY"
ACCESS_TOKEN_LIFE=15m
REFRESH_TOKEN_LIFE=15d
```
*JWT_SECRET ve CSRF_SECRET_KEY kısımlarını kimseyle paylaşmamak şartıyla istediğiniz bilgiyi girebilirsiniz*

- Uygulama içindeki back-end klasörü içindeyken terminalde aşağıdaki komutu kullanarak Back-End’i çalıştırın.

```bash
npm start 
```
Uygulama artık local’inizde çalışır halde.

## Docker ile Projeyi Çalıştırma

Projeyi Docker konteynerinde çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

### Ön Koşullar

- [Docker](https://www.docker.com/) kurulu olmalıdır.

1. git ile clone'ladığınız dosyaya terminalinizden girin.
2. back-end klasörüne geçiş yaptıktan sonra terminalde aşağıdaki komutu çalıştırın.
```bash
docker-compose up -d
```
3. Tarayıcınızda http://127.0.0.1:8080/ e bağlanın. eğer ekranda Cannot GET / yazısını gördüyseniz uygulamanız ayağa kalkmış demektir.