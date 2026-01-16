'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

interface SearchFiltersProps {
    onSearch: (query: string) => void
    onFilterChange: (filters: FilterState) => void
    activeFilters: FilterState
}

export interface FilterState {
    category: string[]
    condition: string[]
    priceRange: [number, number]
    sortBy: 'ending-soon' | 'price-low' | 'price-high' | 'newest'
}

const CATEGORIES = [
    'Electronics',
    'Home & Kitchen',
    'Gaming',
    'Garden',
]

const CONDITIONS = [
    { value: 'new', label: 'New' },
    { value: 'open_box', label: 'Open Box' },
    { value: 'used', label: 'Used' },
]

const SORT_OPTIONS = [
    { value: 'ending-soon', label: 'Ending Soon' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newly Listed' },
]

export function SearchFilters({ onSearch, onFilterChange, activeFilters }: SearchFiltersProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [localFilters, setLocalFilters] = useState<FilterState>(activeFilters)

    const handleSearchChange = (value: string) => {
        setSearchQuery(value)
        onSearch(value)
    }

    const toggleCategory = (category: string) => {
        const newCategories = localFilters.category.includes(category)
            ? localFilters.category.filter(c => c !== category)
            : [...localFilters.category, category]

        setLocalFilters({ ...localFilters, category: newCategories })
    }

    const toggleCondition = (condition: string) => {
        const newConditions = localFilters.condition.includes(condition)
            ? localFilters.condition.filter(c => c !== condition)
            : [...localFilters.condition, condition]

        setLocalFilters({ ...localFilters, condition: newConditions })
    }

    const applyFilters = () => {
        onFilterChange(localFilters)
        setIsOpen(false)
    }

    const clearFilters = () => {
        const defaultFilters: FilterState = {
            category: [],
            condition: [],
            priceRange: [0, 500],
            sortBy: 'ending-soon'
        }
        setLocalFilters(defaultFilters)
        onFilterChange(defaultFilters)
    }

    const activeFilterCount =
        localFilters.category.length +
        localFilters.condition.length +
        (localFilters.priceRange[0] !== 0 || localFilters.priceRange[1] !== 500 ? 1 : 0)

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder="Search auctions..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-10 h-12 text-base"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => handleSearchChange('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </button>
                    )}
                </div>

                {/* Filters Button */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="lg" className="gap-2 relative">
                            <SlidersHorizontal className="w-5 h-5" />
                            <span className="hidden sm:inline">Filters</span>
                            {activeFilterCount > 0 && (
                                <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center">
                                    {activeFilterCount}
                                </Badge>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Filters</SheetTitle>
                            <SheetDescription>
                                Refine your search results
                            </SheetDescription>
                        </SheetHeader>

                        <div className="mt-6 space-y-6">
                            {/* Sort By */}
                            <div>
                                <Label className="text-base font-semibold mb-3 block">Sort By</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {SORT_OPTIONS.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setLocalFilters({ ...localFilters, sortBy: option.value as any })}
                                            className={`p-3 rounded-lg border text-sm font-medium transition-colors ${localFilters.sortBy === option.value
                                                    ? 'bg-primary text-primary-foreground border-primary'
                                                    : 'hover:bg-accent'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div>
                                <Label className="text-base font-semibold mb-3 block">Category</Label>
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.map((category) => (
                                        <Badge
                                            key={category}
                                            variant={localFilters.category.includes(category) ? 'default' : 'outline'}
                                            className="cursor-pointer px-4 py-2 text-sm"
                                            onClick={() => toggleCategory(category)}
                                        >
                                            {category}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Condition */}
                            <div>
                                <Label className="text-base font-semibold mb-3 block">Condition</Label>
                                <div className="flex flex-wrap gap-2">
                                    {CONDITIONS.map((condition) => (
                                        <Badge
                                            key={condition.value}
                                            variant={localFilters.condition.includes(condition.value) ? 'default' : 'outline'}
                                            className="cursor-pointer px-4 py-2 text-sm"
                                            onClick={() => toggleCondition(condition.value)}
                                        >
                                            {condition.label}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <Label className="text-base font-semibold mb-3 block">
                                    Price Range: €{localFilters.priceRange[0]} - €{localFilters.priceRange[1]}
                                </Label>
                                <Slider
                                    min={0}
                                    max={500}
                                    step={10}
                                    value={localFilters.priceRange}
                                    onValueChange={(value) => setLocalFilters({ ...localFilters, priceRange: value as [number, number] })}
                                    className="mt-2"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={clearFilters}
                                >
                                    Clear All
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={applyFilters}
                                >
                                    Apply Filters
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Active Filters Display */}
            {(activeFilters.category.length > 0 || activeFilters.condition.length > 0) && (
                <div className="flex flex-wrap gap-2">
                    {activeFilters.category.map((category) => (
                        <Badge key={category} variant="secondary" className="gap-2">
                            {category}
                            <button onClick={() => toggleCategory(category)}>
                                <X className="w-3 h-3" />
                            </button>
                        </Badge>
                    ))}
                    {activeFilters.condition.map((condition) => (
                        <Badge key={condition} variant="secondary" className="gap-2">
                            {CONDITIONS.find(c => c.value === condition)?.label}
                            <button onClick={() => toggleCondition(condition)}>
                                <X className="w-3 h-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    )
}
