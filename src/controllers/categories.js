import {
    getAllCategories,
    getCategoryDetails,
    getCategoriesByProjectId,
    getProjectsByCategoryId,
    createCategory,
    updateCategory,
    updateCategoryAssignments
} from "../models/categories.js";
import { getProjectsDetails } from "../models/projects.js";
import { body, validationResult } from "express-validator";

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    res.render('categories', { title: 'Categories', categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryDetails(categoryId);

    if (!category) {
        return res.status(404).render('errors/404', { title: 'Page Not Found' });
    }

    const projects = await getProjectsByCategoryId(categoryId);
    res.render('category', { title: category.name, category, projects });
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectsDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', {
        title,
        projectId,
        projectDetails,
        categories,
        assignedCategories
    });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    const categoryIdsArray = Array.isArray(selectedCategoryIds)
        ? selectedCategoryIds
        : [selectedCategoryIds];

    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const categoryValidation = [
    body("name")
        .trim()
        .notEmpty().withMessage("Category name is required.")
        .isLength({ min: 3, max: 100 }).withMessage("Category name must be between 3 and 100 characters.")
];

const showNewCategoryForm = (req, res) => {
    res.render("new-category", { title: "Add New Category" });
};

const processNewCategoryForm = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash("error", error.msg);
        });
        return res.redirect("/new-category");
    }

    const { name } = req.body;

    try {
        const newCategoryId = await createCategory(name);
        req.flash("success", "New category created successfully!");
        res.redirect(`/category/${newCategoryId}`);
    } catch (error) {
        console.error("Error creating new category:", error);
        req.flash("error", "There was an error creating the category.");
        res.redirect("/new-category");
    }
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryDetails(categoryId);

    if (!category) {
        return res.status(404).render("errors/404", { title: "Page Not Found" });
    }

    res.render("edit-category", {
        title: `Edit Category: ${category.name}`,
        category
    });
};

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash("error", error.msg);
        });
        return res.redirect(`/edit-category/${categoryId}`);
    }

    const { name } = req.body;

    try {
        await updateCategory(categoryId, name);
        req.flash("success", "Category updated successfully!");
        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        console.error("Error updating category:", error);
        req.flash("error", "There was an error updating the category.");
        res.redirect(`/edit-category/${categoryId}`);
    }
};

export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    categoryValidation,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
};