import axios from 'axios'

/* eslint-disable */
export default {
    name: "DataShow",
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
    }
}