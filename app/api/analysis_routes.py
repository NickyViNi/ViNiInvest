from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import db, Analysis
from ..forms import AnalysisForm


analysis_routes = Blueprint("analysis", __name__)


@analysis_routes.route("/")
@login_required
def analysis():
    """"Get all analyses"""
    analyses = Analysis.query.all()

    return [a.to_dict() for a in analyses], 200


@analysis_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_analysis(id):
    form = AnalysisForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if analysis.user_id != current_user.id:
        return { "message": "Forbidden" }, 403

    if form.validate_on_submit():
        updated_analysis = Analysis.query.get(id)

        if not updated_analysis:
            return { "message": "analysis couldn't be found" }, 404

        updated_analysis["content"] = form.data["content"]
        updated_analysis["recommendation"] = form.data["recommendation"]

        db.session.commit()
        return updated_analysis.to_dict(), 200

    return form.errors, 400


@analysis_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_analysis(id):
    analysis = Analysis.query.get(id)

    if not analysis:
        return { "message": "analysis couldn't be found" }, 404

    if analysis.user_id != current_user.id:
        return { "message": "Forbidden" }, 403

    db.session.delete(analysis)
    db.session.commit()

    return { "message": "Successfully deleted analysis" }, 200
