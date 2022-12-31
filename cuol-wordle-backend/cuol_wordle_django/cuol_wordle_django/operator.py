from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from cuol_wordle_api.crons import choose_word


def start():
    scheduler = BackgroundScheduler()
    # Every day at midnight choose_word function is triggered
    scheduler.add_job(choose_word,trigger=CronTrigger(minute="0",hour="0"), id="choose_word", max_instances=1, replace_existing=True)

    # Every minute cron jobs
    # scheduler.add_job(choose_word,trigger=CronTrigger(minute="*/1"   ), id="choose_word", max_instances=1, replace_existing=True)  

    scheduler.start()
