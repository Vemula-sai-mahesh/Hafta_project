from flask import Blueprint, render_template
from flask import render_template, redirect, url_for, request, session , jsonify
from app.main import bp
from app.model import User , Role
from app import db



@bp.route('/' , methods=['GET' , 'POST'])
@bp.route('/home' , methods=['GET' , 'POST'])

def home():
    return render_template('reports/dash.html', title=('Home'))


# Sentry verification

@bp.route('/debug-sentry')
def trigger_error():
    division_by_zero = 1 / 0
    return render_template('reports/firms.html', title=('Home'))