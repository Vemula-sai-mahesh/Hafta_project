
<template>
<section class="section has-text-black" id="print_sheet" v-if="salary_sheet!=null">
        <p class="is-size-5 has-text-weight-semibold">{{ titleCase(salary_sheet[0].company[0].name) }} - {{ formatedMonth(date) }}
        </p>
        <br>
       <div v-for="(row , index) in salary_sheet" :key="index">
            <table class="table is-bordered is-fullwidth">
                <thead>
                    <tr>
                        <td colspan="1">
                            <small class="has-text-weight-semibold"> PAY for</small>

                            <p> {{formatedMonth() }} </p>
                        </td>


                        <td colspan="4">
                            <small class="has-text-weight-semibold"> NAME</small>

                            <p>{{ row.employee[0].name}}</p>
                        </td>

                    </tr>

                </thead>
                <tbody>
                    <tr>

                        <td colspan="1">
                            <small class="has-text-weight-semibold"> APPOINTMENT</small>
                            <p v-if="row.employee[0].appointment.length != 0">{{ row.employee[0].appointment[0].name }}</p>
                            <p v-else class="has-text-grey">None</p>


                        </td>
                        <td colspan="1">

                            <small class="has-text-weight-semibold">POST</small>
                            <p v-if="row.employee[0].post.length != 0">{{ row.employee[0].post[0].name }}</p>
                            <p v-else class="has-text-grey">None</p>
                            <!-- <p>{{ row.employee[0].post[0].name }}</p> -->
                        </td>

                        <td colspan="1">
                            <small class="has-text-weight-semibold"> DEPARTMENT</small>

                            <p v-if="row.employee[0].department.length != 0">{{ row.employee[0].department[0].name }}</p>
                            <p v-else class="has-text-grey">None</p>

                        </td>
                        <td colspan="1">
                            <small class="has-text-weight-semibold"> COMPANY</small>

                            <p>{{ titleCase(row.company[0].name) }}</p>

                        </td>
                        <td colspan="1">
                            <small class="has-text-weight-semibold">OVERTIME</small>

                            <p>{{ row.overtime }}</p>

                        </td>
                    </tr>
                    <tr>
                        <td colspan="1">
                            <small class="has-text-weight-semibold"> DAYS ATTENDED</small>

                            <p> {{ row.daysatt }}</p>

                        </td>
                        <td colspan="1">

                            <small class="has-text-weight-semibold">LATE COMING</small>
                            <p>{{ row.latecomin }}</p>
                        </td>

                        <td colspan="1">
                            <small class="has-text-weight-semibold">BASIC PAY</small>

                            <p>{{ formatedNumber(row.employee[0].basicpay) }}</p>

                        </td>
                        <td colspan="1">
                            <small class="has-text-weight-semibold"> DAYS PAYABLE</small>

                            <p>{{ formatedNumber(row.days_payable) }}</p>


                        </td>
                        <td colspan="1">
                            <small class="has-text-weight-semibold"> ADVANCE DEDUCTION</small>
                            <p> {{ formatedNumber(row.net_adv_deduction) }}
                            </p>

                        </td>
                    </tr>
                    <tr>
                        <td colspan="1">

                            <small class="has-text-weight-semibold">P.F</small>
                            <p> {{ row.esi }} </p>
                        </td>

                        <td colspan="1">
                            <small class="has-text-weight-semibold"> ESI</small>

                            <p>{{ row.pf }}</p>

                        </td>
                        <td colspan="1">
                            <small class="has-text-weight-semibold"> TDS</small>

                            <p> {{ row.tds }} </p>

                        </td>
                        <td colspan="1">
                            <small class="has-text-weight-semibold"> Other Deduction</small>

                            <p> {{ row.other_deduction }}</p>
                        </td>
                        <td colspan="1">
                            <small class="has-text-weight-semibold">TOTAL DEDUCTION</small>

                            <p> {{ formatedNumber(row.total_deductions) }} </p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4"> <small class="has-text-weight-semibold">NET PAYABLE</small>
                        </td>
                        <td colspan="1">
                            <p>{{ formatedNumber(row.net_payable) }}</p>
                        </td>
                    </tr>
                </tbody>

            </table>
            <div v-if="row.remarks != '' && row.remarks ">

                <span class="heading">REMARKS</span>
                <p v-for="row in row.remarks.split('\n')">{{row}}</p>
            </div>
            <hr>
        </div>

    </section>
</template>

<script>
export default {
    layout:'empty',
  data() {
    return {
      salary_sheet: null,
      company: null,
      date: null,
      days: Number(0),
      late: 0,
      going: 0,
      salary: 0,
      daysPayable: 0,
      pay_1: 0,
      adv_deduction: 0,
      esi: 0,
      pf: 0,
      tds: 0,
      other_deduction: 0,
      total_deductions: 0,
      net_pay: 0,
    };
  },
  delimiters: ["{{", "}}"],
  mounted() {
    // if (localStorage.jsondata) {
                let payload = JSON.parse(localStorage.getItem('selecteddata'))
      console.log(payload);
      this.salary_sheet = payload.data;
      this.company = payload["company"];
      this.date = payload["date"];
      // this.totalCalc();
    

    if (this.salary_sheet != null) {
      let days = Number(0);
      let late = 0;
      let going = 0;
      let salary = 0;
      let daysPayable = 0;
      let pay_1 = 0;
      let adv_deduction = 0;
      let esi = 0;
      let pf = 0;
      let tds = 0;
      let other_deduction = 0;
      let total_deductions = 0;
      let net_pay = 0;

      this.salary_sheet.forEach(function (item) {
        console.log(item.net_payable);
        days = Number(item.daysatt);
        late += item.latecomin;
        going += item.earlygoing;
        salary += Number(item.employee[0].basicpay);
        daysPayable += item.days_payable;
        pay_1 += item.pay_1;
        adv_deduction += item.net_adv_deduction;
        esi += item.esi;
        pf += item.pf;
        tds += item.tds;
        other_deduction += item.other_deduction;
        total_deductions += item.total_deductions;
        net_pay += item.net_payable;
      });

      this.days = days;
      this.late = late;
      this.going = going;
      this.salary = salary;
      this.daysPayable = daysPayable;
      this.pay_1 = Math.round(pay_1, 2);
      this.adv_deduction = adv_deduction;
      this.esi = esi;
      this.pf = pf;
      this.tds = tds;
      this.other_deduction = other_deduction;
      this.total_deductions = total_deductions;
      this.net_pay = Math.round(net_pay, 2);
    }
  },
  methods: {
    formatedMonth(val) {
      let temp_date = new Date(this.date);
      let month = temp_date.toLocaleString("default", { month: "long" });
      let year = temp_date.getFullYear();
      let print_date = month + " , " + year;
      return print_date;
    },
    formatedNumber(val) {
      let test = Number(val).toLocaleString("en-IN");
      return test;
    },
    totalCalc() {},
  },
};
</script>