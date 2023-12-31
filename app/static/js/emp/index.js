new Vue({
    el: '#emp_show',
    data() {
        return {
            data: [],
            gridColumns: ['name', 'company', 'salary'],
            searchQuery: '',
            dataList: [],
            currentSort: 'name',
            currentSortDir: 'asc',
            detailModal: false,
            empDetail: null,
            confirmModal: { 'close': false, 'data': null },


        }
    },
    mounted() {
        feather.replace();
        this.getEmployees();
    },
    computed: {

        filteredList() {
            this.dataList = this.data.filter(data => {
                return data.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            });

            if (this.currentSort == 'name') {
                if (this.currentSortDir == 'asc') {
                    this.dataList.sort(function (a, b) { return ('' + a.name).localeCompare(b.name) })
                }
                else if (this.currentSortDir == 'desc') {
                    this.dataList.sort(function (a, b) { return ('' + a.name).localeCompare(b.name) }).reverse()
                }
            }

            if (this.currentSort == 'id') {
                if (this.currentSortDir == 'asc') {
                    this.dataList.sort(function (a, b) { return a.id - b.id })
                }
                else if (this.currentSortDir == 'desc') {
                    this.dataList.sort(function (a, b) { return a.id - b.id }).reverse()

                }

            }

            if (this.currentSort == 'salary') {
                if (this.currentSortDir == 'asc') {

                    this.dataList.sort(function (a, b) { if (a.basicpay != undefined && b.basicpay != undefined) return a.basicpay - b.basicpay })
                }
                else if (this.currentSortDir == 'desc') {
                    this.dataList.sort(function (a, b) { if (a.basicpay != undefined && b.basicpay != undefined) return a.basicpay - b.basicpay }).reverse()

                }

            }

            if (this.currentSort == 'firm') {
                if (this.currentSortDir == 'asc') {

                    this.dataList.sort(function (a, b) { if (a.company.length != 0 && b.company.length != 0) return ('' + a.company[0].name).localeCompare(b.company[0].name) })
                }
                else if (this.currentSortDir == 'desc') {
                    this.dataList.sort(function (a, b) { if (a.company.length != 0 && b.company.length != 0) return ('' + a.company[0].name).localeCompare(b.company[0].name) }).reverse()

                }
            }


            return this.dataList
        },
        // filteredList() {
        //     return this.dataList = this.data.filter(data => {
        //         return data.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        //     })


        // }
    },
    delimiters: ['[[', ']]'],
    methods: {
        showEmpDetail() {
            window.location.href = "/employee/view/detail/"+String(this.empDetail.id)  
          },
        getEmployees() {
            let self = this
            axios.get('/employee/get/basic')
                .then(function (response) {
                    self.data = JSON.parse(response.data)
                    self.dataList = JSON.parse(response.data)
                })
        },
        formatedNumber(val) {
            let test = Number(val).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
            console.log(test)
            return test
        },
        formatedDate(val) {
            var date = new Date(val)
            return (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());


        },
        selectRow(id) {
            console.log(id)
        },
        sortBy(sortKey) {
            console.log(sortKey)
            if (sortKey === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = sortKey;


        },
        employeeDetail(id) {
            this.detailModal = !this.detailModal
            let self = this
            axios.post('/employee/get/detail/' + String(id))
                .then(function (response) {
                    self.empDetail = JSON.parse(response.data)
                })
        },
        setConfirm(index) {
            this.confirmModal.data = dataList[index]
            this.confirmModal.close = !this.confirmModal.close

        },
        editEmployee(index){
            window.location.href= "/employee/edit/view/"+String(index)
        },
        employeeDelete(id) {
            this.confirmModal.close = !this.confirmModal.close
            let self = this
            let emp_id = id
            // console.log(id , emp_index)
            axios.post('/employee/delete/' + String(id))
                .then(function (response) {
                    if (response.data.success) {
                        self.$buefy.snackbar.open({
                            duration: 4000,
                            message: response.data.success,
                            type: 'is-light',
                            position: 'is-top-right',
                            actionText: 'Close',
                            queue: true,
                            onAction: () => {
                                this.isActive = false;
                            }
                        })

                        self.data.filter(function (item) {

                            if (Number(item.id) == Number(emp_id)) {
                                console.log(emp_id , item.id , self.data.indexOf(item))
                                self.data.splice(self.data.indexOf(item), 1)
                                console.log('-------DAATA-----------'+self.data)
                            }
                        })
                    }

                })
        }


    }

})

Vue.component('vue-feather', VueFeather);

