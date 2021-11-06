<template>
<div class="row py-4">
  <div class="col-md-6">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Form Peminjaman Buku</h3>
      </div>
      <div class="card-body">
        <form action="" @submit.prevent="add">
        <div class="form-group">
          <label for="">Nama Siswa</label>
          <input type="text" v-model="form.name" placeholder="Nama Siswa" class="form-control" required/>
        </div>
        <div class="form-group">
          <label for="">Judul Buku</label>
          <input type="text" v-model="form.judul" placeholder="Judul Buku" class="form-control" required/>
        </div>
        <div class="form-group">
          <label for="">Tanggal Pinjam</label>
          <input type="date" v-model="form.pinjam" placeholder="Tanggal Pinjam" class="form-control" required/>
        </div>
        <div class="form-group">
          <label for="">Tanggal Kembali</label>
          <input type="date" v-model="form.kembali" placeholder="Tanggal Kembali" class="form-control" required/>
        </div>
        <br />
        <div class="form-group">
        <button class="btn btn-danger btn-sm" type="submit" v-show="!updateSubmit">Tambah Buku</button>
        <button class="btn btn-success btn-sm" type="button" v-show="updateSubmit" @click="update(form)">
          Update
        </button>
        </div>
        </form>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Tabel Daftar Buku</h3>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Siswa</th>
                <th>Judul Buku</th>
                <th>Tanggal Pinjam</th>
                <th>Tanggal Kembali</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in perpus" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.judul }}</td>
                <td>{{ user.pinjam }}</td>
                <td>{{ user.kembali }}</td>
                <td>
                  <i class="bi bi-pencil-fill" @click="edit(user)"></i> / <i class="bi bi-trash-fill" @click="del(user)"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";

/* eslint-disable */
export default {
  name: "DataInput",
  data() {
    return {
      form: {
        id: "",
        name: "",
        judul: "",
        pinjam: "",
        kembali: "",
      },
      perpus: "",
      updateSubmit: false,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      axios
        .get("http://localhost:3000/perpus")
        .then((res) => {
          this.perpus = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    add() {
      axios.post("http://localhost:3000/perpus/", this.form).then((res) => {
        this.load();
        this.form.name = "";
        this.form.judul = "";
        this.form.pinjam = "";
        this.form.kembali = "";
      });
    },
    edit(user) {
      this.updateSubmit = true;
      this.form.id = user.id;
      this.form.name = user.name;
      this.form.judul = user.judul;
      this.form.pinjam = user.pinjam;
      this.form.kembali = user.kembali;
    },
    update(form) {
      return axios
        .put("http://localhost:3000/perpus/" + form.id, {
          name: this.form.name,
          judul: this.form.judul,
          pinjam: this.form.pinjam,
          kembali: this.form.kembali,
        })
        .then((res) => {
          this.load();
          this.form.id = "";
          this.form.name = "";
          this.form.judul = "";
          this.form.pinjam = "";
          this.form.kembali = "";
          this.updateSubmit = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del(user) {
      axios.delete("http://localhost:3000/perpus/" + user.id).then((res) => {
        this.load();
        let index = this.perpus.indexOf(form.name);
        this.perpus.splice(index, 1);
      });
    },
  },
};
</script>