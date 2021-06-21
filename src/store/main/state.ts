export interface MainStateInterface {
  settings: any;
  user: any | null;
  dataProfessional: any;
  dataCompany: any;
  options: any; // 0: not, 1: professional, 2: recruiter
}

function state(): MainStateInterface {
  return {
    settings: {
      darkMode: true,
    },
    user: {
      uid: "",
      email: "",
      emailVerified: false,
      type: -1,
    },
    dataProfessional: {
      name: "",
      username: "",
      birthdate: "",
      job_id: [],
      city_id: [],
      religion_id: -1,
      gender_id: -1,
      verificationStatus: 0, // 0 belum, 1 pending, 2 sukses, 3 declined
      verificationDate: null,
    },
    dataCompany: {
      address: "",
      business_type_id: "",
      name: "",
      npwp: "",
      phone_num: "",
      about: "",
      website: "",
    },
    options: {
      types: [
        { value: 0, label: "Professional" },
        { value: 1, label: "Perusahaan" },
      ],
      genders: [
        { value: 0, label: "Pria" },
        { value: 1, label: "Wanita" },
      ],
      jobs: [
        { value: 0, label: "Lainnya" },
        { value: 1, label: "Akuntansi/Keuangan" },
        { value: 2, label: "Sumber Daya Manusia/Personalia" },
        { value: 3, label: "Penjualan/Pemasaran" },
        { value: 4, label: "Seni/Media/Komunikasi" },
        { value: 5, label: "Pelayanan" },
        { value: 6, label: "Hotel/Restoran" },
        { value: 7, label: "Pendidikan/Pelatihan" },
        { value: 8, label: "Komputer/Teknologi Informasi" },
        { value: 9, label: "Teknik" },
        { value: 10, label: "Manufaktur" },
        { value: 11, label: "Bangunan/Konstruksi" },
        { value: 12, label: "Sains" },
        { value: 13, label: "Layanan Kesehatan" },
      ],
      jobSectors:[
        { value: 0, label: "Lainnya" },
      ],
      religions: [
        { value: 1, label: "Kristen" },
        { value: 2, label: "Katolik" },
        { value: 3, label: "Buddha" },
        { value: 4, label: "Hindu" },
        { value: 5, label: "Islam" },
        { value: 6, label: "Konghucu" },
      ],
      cities: [
        { value: 1, label: "Ambon" },
        { value: 2, label: "Balikpapan" },
        { value: 3, label: "Banda Aceh" },
        { value: 4, label: "Bandar Lampung" },
        { value: 5, label: "Bandung" },
        { value: 6, label: "Banjar" },
        { value: 7, label: "Banjarbaru" },
        { value: 8, label: "Banjarmasin" },
        { value: 9, label: "Batam" },
        { value: 10, label: "Batu" },
        { value: 11, label: "Bau-Bau" },
        { value: 12, label: "Bekasi" },
        { value: 13, label: "Bengkulu" },
        { value: 14, label: "Bima" },
        { value: 15, label: "Binjai" },
        { value: 16, label: "Bitung" },
        { value: 17, label: "Blitar" },
        { value: 18, label: "Bogor" },
        { value: 19, label: "Bontang" },
        { value: 20, label: "Bukittinggi" },
        { value: 21, label: "Cilegon" },
        { value: 22, label: "Cimahi" },
        { value: 23, label: "Cirebon" },
        { value: 24, label: "Denpasar" },
        { value: 25, label: "Depok" },
        { value: 26, label: "Dumai" },
        { value: 27, label: "Gorontalo" },
        { value: 28, label: "Jambi" },
        { value: 30, label: "Jakarta" },
        { value: 34, label: "Jayapura" },
        { value: 35, label: "Kediri" },
        { value: 36, label: "Kendari" },
        { value: 37, label: "Kotamobagu" },
        { value: 38, label: "Kupang" },
        { value: 39, label: "Langsa" },
        { value: 40, label: "Lhokseumawe" },
        { value: 41, label: "Lubuklinggau" },
        { value: 42, label: "Madiun" },
        { value: 43, label: "Magelang" },
        { value: 44, label: "Makassar" },
        { value: 45, label: "Malang" },
        { value: 46, label: "Manado" },
        { value: 47, label: "Mataram" },
        { value: 48, label: "Medan" },
        { value: 49, label: "Metro" },
        { value: 50, label: "Meulaboh" },
        { value: 51, label: "Mojokerto" },
        { value: 52, label: "Padang" },
        { value: 53, label: "Padang Sidempuan" },
        { value: 54, label: "Padangpanjang" },
        { value: 55, label: "Pagaralam" },
        { value: 56, label: "Palangkaraya" },
        { value: 57, label: "Palembang" },
        { value: 58, label: "Palopo" },
        { value: 59, label: "Palu" },
        { value: 60, label: "Pangkalpinang" },
        { value: 61, label: "Parepare" },
        { value: 62, label: "Pariaman" },
        { value: 63, label: "Pasuruan" },
        { value: 64, label: "Payakumbuh" },
        { value: 65, label: "Pekalongan" },
        { value: 66, label: "Pekanbaru" },
        { value: 67, label: "Pematangsiantar" },
        { value: 68, label: "Pontianak" },
        { value: 69, label: "Prabumulih" },
        { value: 70, label: "Probolinggo" },
        { value: 71, label: "Purwokerto" },
        { value: 72, label: "Sabang" },
        { value: 73, label: "Salatiga" },
        { value: 74, label: "Samarinda" },
        { value: 75, label: "Sawahlunto" },
        { value: 76, label: "Semarang" },
        { value: 77, label: "Serang" },
        { value: 78, label: "Sibolga" },
        { value: 79, label: "Singkawang" },
        { value: 80, label: "Solok" },
        { value: 81, label: "Sorong" },
        { value: 82, label: "Subulussalam" },
        { value: 83, label: "Sukabumi" },
        { value: 84, label: "Sungai Penuh" },
        { value: 85, label: "Surabaya" },
        { value: 86, label: "Surakarta" },
        { value: 87, label: "Tangerang" },
        { value: 88, label: "Tangerang Selatan" },
        { value: 89, label: "Tanjungbalai" },
        { value: 90, label: "Tanjungpinang" },
        { value: 91, label: "Tarakan" },
        { value: 92, label: "Tasikmalaya" },
        { value: 93, label: "Tebingtinggi" },
        { value: 94, label: "Tegal" },
        { value: 95, label: "Ternate" },
        { value: 96, label: "Tidore Kepulauan" },
        { value: 97, label: "Tomohon" },
        { value: 98, label: "Tual" },
        { value: 99, label: "Yogyakarta" },
        { value: 100, label: "Gresik" },
        { value: 101, label: "Sidoarjo" },
        { value: 102, label: "Lamongan" },
      ],
    },
  };
}

export default state;
