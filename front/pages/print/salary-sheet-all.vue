
<template>
<section class="section has-text-black" id="print_sheet" v-if="salary_sheet!=null">
        <p class="is-size-5 has-text-weight-semibold">{{ titleCase(salary_sheet[0].company[0].name) }} - {{ formatedMonth(date) }}
        </p>
        <br>
        <table class="table is-fullwidth is-bordered">
            <thead class="has-text-weight-semibold">
                <tr>
                    <td>Name</td>
                    <td>Dept.</td>
                    <td>Post</td>
                    <td>Days Attn.</td>
                    <td>Late Comin</td>
                    <td>Early Going</td>
                    <td>Salary</td>
                    <td>Days Payable</td>
                    <td>Pay #1</td>
                    <td>Adv. Ded.</td>
                    <td>ESI</td>
                    <td>PF</td>
                    <td>TDS</td>
                    <td>Overtime</td>
                    <td>Other Ded.</td>
                    <td>Total Ded. #2</td>
                    <td>Net Payable ( #1 - #2)</td>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th colspan="3">Total</th>
                    <th>{{ formatedNumber(days) }}</th>
                    <th>{{ formatedNumber(late) }}</th>
                    <th>{{ formatedNumber(going) }}</th>
                    <th>{{ formatedNumber(salary) }}</th>
                    <th>{{ formatedNumber(daysPayable) }}</th>
                    <th>{{ formatedNumber(pay_1) }}</th>
                    <th>{{ formatedNumber(adv_deduction) }}</th>
                    <th>{{ formatedNumber(esi) }}</th>
                    <th>{{ formatedNumber(pf) }}</th>
                    <th>{{ formatedNumber(tds) }}</th>
                    <th>{{ formatedNumber(overtime )}}</th>
                    <th>{{ formatedNumber(other_deduction )}}</th>
                    <th>{{ formatedNumber(total_deductions) }}</th>
                    <th>{{ formatedNumber(net_pay) }}</th>
                </tr>
            </tfoot>
            <tbody>

                <tr v-for="(row , index) in salary_sheet" :key="index">
                    <td>{{ row.employee[0].name}}</td>
                    <td>
                        <span v-if="row.employee[0].department.length != 0">

                        {{ row.employee[0].department[0].name}}
                        </span>
                        <span v-else class="has-text-grey">None</span>
                        </td>
                    <td>
                        <span v-if="row.employee[0].post.length != 0">

                        {{ row.employee[0].post[0].name}}
                        </span>
                        <span v-else class="has-text-grey">None</span>
                        </td>
                    <td> {{ row.daysatt }}</td>
                    <td> {{ row.latecomin }}</td>
                    <td> {{ row.earlygoing }}</td>
                    <td>{{ formatedNumber(row.employee[0].basicpay) }}</td>
                    <td>{{ formatedNumber(row.days_payable) }}</td>
                    <td>{{ formatedNumber(row.pay_1) }}</td>
                    <td>
                        {{ formatedNumber(row.net_adv_deduction) }}


                    </td>
                    <td>{{ row.esi }}</td>
                    <td>{{ row.pf }}</td>
                    <td>{{ row.tds }}</td>
                    <td>{{ row.overtime }}</td>
                    <td>{{ row.other_deduction }}</td>
                    <td>{{ formatedNumber(row.total_deductions) }}</td>
                    <td>{{ formatedNumber(row.net_payable) }}</td>
                </tr>

            </tbody>
        </table>
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
      overtime: 0,
      other_deduction: 0,
      total_deductions: 0,
      net_pay: 0,
    };
  },
  delimiters: ["{{", "}}"],
  mounted() {
    if (localStorage.jsondata) {
      let payload = JSON.parse(localStorage.getItem("jsondata"));
      console.log(payload);
      this.salary_sheet = payload.data;
      this.company = payload["company"];
      this.date = payload["date"];
      // this.totalCalc();
    }

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
      let overtime = 0;
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
        overtime += item.overtime;
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
      this.overtime = overtime;
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